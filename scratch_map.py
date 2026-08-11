import xml.etree.ElementTree as ET
import re
import math
import json

def parse_svg_path_points(d_string):
    # Matches SVG path commands and coordinates
    # Traces the absolute pen position to find the correct coordinates of vertices
    commands = re.findall(r'([a-df-zAD-F-Z])|(-?[\d\.]+)', d_string)
    
    points = []
    curr_x = 0.0
    curr_y = 0.0
    
    last_cmd = 'M'
    i = 0
    while i < len(commands):
        token, num_val = commands[i]
        if token:
            cmd = token
            i += 1
        else:
            cmd = last_cmd
            
        last_cmd = cmd
        
        # Read numbers for this command
        nums = []
        while i < len(commands) and commands[i][1]:
            nums.append(float(commands[i][1]))
            i += 1
            
        if cmd == 'M':
            for idx in range(0, len(nums), 2):
                if idx + 1 < len(nums):
                    curr_x = nums[idx]
                    curr_y = nums[idx+1]
                    points.append((curr_x, curr_y))
        elif cmd == 'm':
            for idx in range(0, len(nums), 2):
                if idx + 1 < len(nums):
                    curr_x += nums[idx]
                    curr_y += nums[idx+1]
                    points.append((curr_x, curr_y))
        elif cmd == 'L':
            for idx in range(0, len(nums), 2):
                if idx + 1 < len(nums):
                    curr_x = nums[idx]
                    curr_y = nums[idx+1]
                    points.append((curr_x, curr_y))
        elif cmd == 'l':
            for idx in range(0, len(nums), 2):
                if idx + 1 < len(nums):
                    curr_x += nums[idx]
                    curr_y += nums[idx+1]
                    points.append((curr_x, curr_y))
        elif cmd == 'H':
            for num in nums:
                curr_x = num
                points.append((curr_x, curr_y))
        elif cmd == 'h':
            for num in nums:
                curr_x += num
                points.append((curr_x, curr_y))
        elif cmd == 'V':
            for num in nums:
                curr_y = num
                points.append((curr_x, curr_y))
        elif cmd == 'v':
            for num in nums:
                curr_y += num
                points.append((curr_x, curr_y))
        elif cmd == 'C':
            for idx in range(0, len(nums), 6):
                if idx + 5 < len(nums):
                    curr_x = nums[idx+4]
                    curr_y = nums[idx+5]
                    points.append((curr_x, curr_y))
        elif cmd == 'c':
            for idx in range(0, len(nums), 6):
                if idx + 5 < len(nums):
                    curr_x += nums[idx+4]
                    curr_y += nums[idx+5]
                    points.append((curr_x, curr_y))
        elif cmd in ['S', 'Q']:
            for idx in range(0, len(nums), 4):
                if idx + 3 < len(nums):
                    curr_x = nums[idx+2]
                    curr_y = nums[idx+3]
                    points.append((curr_x, curr_y))
        elif cmd in ['s', 'q']:
            for idx in range(0, len(nums), 4):
                if idx + 3 < len(nums):
                    curr_x += nums[idx+2]
                    curr_y += nums[idx+3]
                    points.append((curr_x, curr_y))
        elif cmd == 'A':
            for idx in range(0, len(nums), 7):
                if idx + 6 < len(nums):
                    curr_x = nums[idx+5]
                    curr_y = nums[idx+6]
                    points.append((curr_x, curr_y))
        elif cmd == 'a':
            for idx in range(0, len(nums), 7):
                if idx + 6 < len(nums):
                    curr_x += nums[idx+5]
                    curr_y += nums[idx+6]
                    points.append((curr_x, curr_y))
                    
    return points

def get_text_pos_and_value(text_elem):
    transform = text_elem.get("transform")
    val = "".join(text_elem.itertext()).strip()
    
    x = 0.0
    y = 0.0
    if transform:
        m = re.search(r'translate\(\s*([\d\.-]+)\s*,\s*([\d\.-]+)\s*\)', transform)
        if m:
            x = float(m.group(1))
            y = float(m.group(2))
            
    # Find tspan elements inside text
    tspan = text_elem.find(".//{http://www.w3.org/2000/svg}tspan")
    if tspan is None:
        tspan = text_elem.find(".//tspan")
    if tspan is not None:
        tx_val = tspan.get("x")
        ty_val = tspan.get("y")
        if tx_val:
            x += float(tx_val)
        if ty_val:
            y += float(ty_val)
            
    return val, x, y

try:
    tree = ET.parse("karnataka.svg")
    root = tree.getroot()
    
    # 1. Parse all texts
    text_data = []
    for txt in root.findall(".//{http://www.w3.org/2000/svg}text") + root.findall(".//text"):
        val, tx, ty = get_text_pos_and_value(txt)
        if val:
            text_data.append((val, tx, ty))
            
    # 2. Parse all paths
    path_data = []
    for path in root.findall(".//{http://www.w3.org/2000/svg}path") + root.findall(".//path"):
        d = path.get("d")
        p_id = path.get("id")
        if d and len(d) > 200: # filter out small icons/accents
            pts = parse_svg_path_points(d)
            if pts:
                avg_x = sum(p[0] for p in pts) / len(pts)
                avg_y = sum(p[1] for p in pts) / len(pts)
                path_data.append({
                    "id": p_id,
                    "d": d,
                    "center": (avg_x, avg_y)
                })
                
    print(f"Parsed {len(text_data)} text labels and {len(path_data)} potential district paths.")
    
    # 3. Match paths to closest text label
    matched_districts = {}
    for p in path_data:
        px, py = p["center"]
        min_dist = float('inf')
        closest_label = None
        for val, tx, ty in text_data:
            dist = math.sqrt((px - tx)**2 + (py - ty)**2)
            if dist < min_dist:
                min_dist = dist
                closest_label = val
        if closest_label:
            # Avoid mapping if the distance is unreasonably far
            if min_dist < 400: # SVG units threshold
                matched_districts[closest_label] = p["d"]
            
    print(f"Successfully matched {len(matched_districts)} districts:")
    for dist_name, d_path in sorted(matched_districts.items()):
        print(f"'{dist_name}': {len(d_path)} chars")
        
    # Write output to json
    with open("district_paths.json", "w") as f:
        json.dump(matched_districts, f, indent=2)
    print("Wrote district_paths.json")
    
except Exception as e:
    print(f"Error: {e}")
