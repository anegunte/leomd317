import xml.etree.ElementTree as ET
import json
import os
import re
import math
import random

def parse_svg_path_points(d_string):
    commands = re.findall(r'([a-df-zA-DF-Z])|(-?[\d\.]+)', d_string)
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
    transform = text_elem.get('transform')
    val = ''.join(text_elem.itertext()).strip()
    x, y = 0.0, 0.0
    if transform:
        m = re.search(r'translate\(\s*([\d\.-]+)\s*,\s*([\d\.-]+)\s*\)', transform)
        if m:
            x = float(m.group(1))
            y = float(m.group(2))
    tspan = text_elem.find('.//{http://www.w3.org/2000/svg}tspan') or text_elem.find('.//tspan')
    if tspan is not None:
        tx = tspan.get('x')
        ty = tspan.get('y')
        if tx: x += float(tx)
        if ty: y += float(ty)
    return val, x, y

# Mapping from Revenue District to LEO District
leo_mapping = {
  'Bangalore Urban': '317A',
  'Bangalore Rural': '317A',
  'Ramanagara': '317A',
  'Tumkur': '317A',
  'Belagavi': '317B',
  'Bagalkot': '317B',
  'Bijapur': '317B',
  'Raichur': '317B',
  'Koppal': '317B',
  'Gadag': '317B',
  'Dharwad': '317B',
  'Uttara Kannada': '317B',
  'Haveri': '317B',
  'Ballari': '317B',
  'Vijayanagara': '317B',
  'Goa': '317B',
  'Shimoga': '317C',
  'Davanagere': '317C',
  'Chitradurga': '317C',
  'Udupi': '317C',
  'Dakshina Kannada': '317D',
  'Chikmagalur': '317D',
  'Hassan': '317D',
  'Kodagu': '317D',
  'Kolar': '317E',
  'Chikkaballapura': '317F',
  'Mandya': '317G',
  'Mysore': '317G',
  'Chamarajanagar': '317G',
  'Gulbarga': '',
  'Yadgir': '',
  'Bidar': ''
}

tree = ET.parse('karnataka.svg')
root = tree.getroot()

text_data = []
for txt in root.findall('.//{http://www.w3.org/2000/svg}text') + root.findall('.//text'):
    val, tx, ty = get_text_pos_and_value(txt)
    if val:
        text_data.append((val, tx, ty))
        
group = root.find('.//{http://www.w3.org/2000/svg}g[@id=\"g1187\"]') or root.find('.//g[@id=\"g1187\"]')
paths = group.findall('.//{http://www.w3.org/2000/svg}path') + group.findall('.//path')
path_data = []
for p in paths:
    d = p.get('d')
    p_id = p.get('id')
    pts = parse_svg_path_points(d)
    min_x = min(pt[0] for pt in pts)
    max_x = max(pt[0] for pt in pts)
    min_y = min(pt[1] for pt in pts)
    max_y = max(pt[1] for pt in pts)
    cx, cy = (min_x + max_x)/2, (min_y + max_y)/2
    path_data.append({'id': p_id, 'd': d, 'center': (cx, cy)})

goa_path = None
chittoor_path = None
for p in root.iter():
    if p.tag.endswith('path'):
        if p.get('id') == 'polyline73':
            goa_path = p
        elif p.get('id') == 'path71':
            chittoor_path = p

n = len(text_data)
dist_matrix = []
for i in range(n):
    row = []
    tx, ty = text_data[i][1], text_data[i][2]
    for j in range(n):
        px, py = path_data[j]['center']
        dist = math.sqrt((px - tx)**2 + (py - ty)**2)
        row.append(dist)
    dist_matrix.append(row)

# Simulated Annealing to find best permutation
def get_cost(perm):
    return sum(dist_matrix[i][perm[i]]**2 for i in range(n))

current_perm = []
used = set()
for i in range(n):
    best_j = -1
    best_d = float('inf')
    for j in range(n):
        if j not in used and dist_matrix[i][j] < best_d:
            best_d = dist_matrix[i][j]
            best_j = j
    current_perm.append(best_j)
    used.add(best_j)

current_cost = get_cost(current_perm)
best_perm = list(current_perm)
best_cost = current_cost

T = 100000.0
cooling_rate = 0.9999
steps = 400000

for step in range(steps):
    i, j = random.randint(0, n-1), random.randint(0, n-1)
    if i == j: continue
    new_perm = list(current_perm)
    new_perm[i], new_perm[j] = new_perm[j], new_perm[i]
    new_cost = get_cost(new_perm)
    diff = new_cost - current_cost
    if diff < 0 or random.random() < math.exp(-diff / T):
        current_perm = new_perm
        current_cost = new_cost
        if current_cost < best_cost:
            best_cost = current_cost
            best_perm = list(current_perm)
    T *= cooling_rate

# Create matches dictionary from best_perm
matches = {}
for i in range(n):
    matches[text_data[i][0]] = path_data[best_perm[i]]['id']

path_lookup = {p.get('id'): p for p in paths}
district_data = []

# Process Karnataka revenue districts
for name, pid in matches.items():
    p = path_lookup[pid]
    d = p.get('d')
    pts = parse_svg_path_points(d)
    min_x = min(pt[0] for pt in pts)
    max_x = max(pt[0] for pt in pts)
    min_y = min(pt[1] for pt in pts)
    max_y = max(pt[1] for pt in pts)
    cx, cy = (min_x + max_x)/2, (min_y + max_y)/2
    
    district_data.append({
        'id': name.lower().replace(' ', '_'),
        'name': name,
        'leoDistrictId': leo_mapping[name],
        'path': d,
        'center': [round(cx, 1), round(cy, 1)]
    })

# Process Goa
if goa_path is not None:
    # 1. Get polyline73 points (North border)
    pts_poly = parse_svg_path_points(goa_path.get('d'))

    # 2. Get Belagavi points (East border)
    p_bela = [p for p in root.iter() if p.tag.endswith('path') and p.get('id') == '_x31_81'][0]
    pts_bela_all = parse_svg_path_points(p_bela.get('d'))
    idx_start, idx_end = -1, -1
    min_d_start, min_d_end = 9999.0, 9999.0
    for idx, pt in enumerate(pts_bela_all):
        d_start = (pt[0] - 118.4)**2 + (pt[1] - 940.2)**2
        if d_start < min_d_start:
            min_d_start = d_start
            idx_start = idx
        d_end = (pt[0] - 219.0)**2 + (pt[1] - 1013.2)**2
        if d_end < min_d_end:
            min_d_end = d_end
            idx_end = idx
    if idx_start < idx_end:
        pts_bela = pts_bela_all[idx_start:idx_end+1]
    else:
        pts_bela = pts_bela_all[idx_end:idx_start+1][::-1]

    # 3. Get Uttara Kannada points (South border)
    p_uk = [p for p in root.iter() if p.tag.endswith('path') and p.get('id') == 'path1065'][0]
    pts_uk_all = parse_svg_path_points(p_uk.get('d'))
    idx_start_uk, idx_end_uk = -1, -1
    min_d_start_uk, min_d_end_uk = 9999.0, 9999.0
    for idx, pt in enumerate(pts_uk_all):
        d_start = (pt[0] - 219.0)**2 + (pt[1] - 1013.2)**2
        if d_start < min_d_start_uk:
            min_d_start_uk = d_start
            idx_start_uk = idx
        d_end = (pt[0] - 149.3)**2 + (pt[1] - 1216.4)**2
        if d_end < min_d_end_uk:
            min_d_end_uk = d_end
            idx_end_uk = idx
    if idx_start_uk < idx_end_uk:
        pts_uk = pts_uk_all[idx_start_uk:idx_end_uk+1]
    else:
        pts_uk = pts_uk_all[idx_end_uk:idx_start_uk+1][::-1]

    # Combine all points into a single closed path
    combined_pts = list(pts_poly)
    for pt in pts_bela:
        if (pt[0] - combined_pts[-1][0])**2 + (pt[1] - combined_pts[-1][1])**2 > 1.0:
            combined_pts.append(pt)
    for pt in pts_uk:
        if (pt[0] - combined_pts[-1][0])**2 + (pt[1] - combined_pts[-1][1])**2 > 1.0:
            combined_pts.append(pt)

    # 4. Get Coast points from path1182
    p_coast = [p for p in root.iter() if p.tag.endswith('path') and p.get('id') == 'path1182'][0]
    pts_coast_all = parse_svg_path_points(p_coast.get('d'))
    idx_start_c, idx_end_c = -1, -1
    min_d_start_c, min_d_end_c = 9999.0, 9999.0
    for idx, pt in enumerate(pts_coast_all):
        d_start = (pt[0] - 149.3)**2 + (pt[1] - 1216.4)**2
        if d_start < min_d_start_c:
            min_d_start_c = d_start
            idx_start_c = idx
        d_end = (pt[0] - 1.6948274)**2 + (pt[1] - 918.76572)**2
        if d_end < min_d_end_c:
            min_d_end_c = d_end
            idx_end_c = idx
    if idx_start_c < idx_end_c:
        pts_coast = pts_coast_all[idx_start_c:idx_end_c+1]
    else:
        pts_coast = pts_coast_all[idx_end_c:idx_start_c+1][::-1]

    # Combine all points into a single closed path
    combined_pts = list(pts_poly)
    for pt in pts_bela:
        if (pt[0] - combined_pts[-1][0])**2 + (pt[1] - combined_pts[-1][1])**2 > 1.0:
            combined_pts.append(pt)
    for pt in pts_uk:
        if (pt[0] - combined_pts[-1][0])**2 + (pt[1] - combined_pts[-1][1])**2 > 1.0:
            combined_pts.append(pt)
    for pt in pts_coast:
        if (pt[0] - combined_pts[-1][0])**2 + (pt[1] - combined_pts[-1][1])**2 > 1.0:
            combined_pts.append(pt)

    # Create the SVG path string
    d_closed = "M {:.3f},{:.3f}".format(combined_pts[0][0], combined_pts[0][1])
    for pt in combined_pts[1:]:
        d_closed += " L {:.3f},{:.3f}".format(pt[0], pt[1])
    d_closed += " Z"

    # Calculate center of the closed polygon
    min_x = min(pt[0] for pt in combined_pts)
    max_x = max(pt[0] for pt in combined_pts)
    min_y = min(pt[1] for pt in combined_pts)
    max_y = max(pt[1] for pt in combined_pts)
    cx, cy = (min_x + max_x)/2, (min_y + max_y)/2

    district_data.append({
        'id': 'goa',
        'name': 'Goa',
        'leoDistrictId': 'GOA',
        'path': d_closed,
        'center': [round(cx, 1), round(cy, 1)]
    })

# Process Chittoor (Andhra Pradesh section under 317E)
if chittoor_path is not None:
    pts_chit = parse_svg_path_points(chittoor_path.get('d'))
    
    # Get Kolar points (border segment)
    p_kolar = [p for p in root.iter() if p.tag.endswith('path') and p.get('id') == '_x31_91'][0]
    pts_kolar_all = parse_svg_path_points(p_kolar.get('d'))
    
    idx_end_k = -1 # closest to Chittoor's end
    idx_start_k = -1 # closest to Chittoor's start
    min_d_end = 99999.0
    min_d_start = 99999.0
    
    pt_chit_end = pts_chit[-1]
    pt_chit_start = pts_chit[0]
    
    for idx, pt in enumerate(pts_kolar_all):
        d_end = (pt[0] - pt_chit_end[0])**2 + (pt[1] - pt_chit_end[1])**2
        if d_end < min_d_end:
            min_d_end = d_end
            idx_end_k = idx
            
        d_start = (pt[0] - pt_chit_start[0])**2 + (pt[1] - pt_chit_start[1])**2
        if d_start < min_d_start:
            min_d_start = d_start
            idx_start_k = idx
            
    if idx_end_k < idx_start_k:
        pts_kolar = pts_kolar_all[idx_end_k:idx_start_k+1]
    else:
        pts_kolar = pts_kolar_all[idx_start_k:idx_end_k+1][::-1]
        
    combined = list(pts_chit)
    for pt in pts_kolar:
        if (pt[0] - combined[-1][0])**2 + (pt[1] - combined[-1][1])**2 > 1.0:
            combined.append(pt)
            
    d_closed = "M {:.3f},{:.3f}".format(combined[0][0], combined[0][1])
    for pt in combined[1:]:
        d_closed += " L {:.3f},{:.3f}".format(pt[0], pt[1])
    d_closed += " Z"
    
    min_x = min(pt[0] for pt in combined)
    max_x = max(pt[0] for pt in combined)
    min_y = min(pt[1] for pt in combined)
    max_y = max(pt[1] for pt in combined)
    cx, cy = (min_x + max_x)/2, (min_y + max_y)/2
    
    district_data.append({
        'id': 'chittoor',
        'name': 'Chittoor',
        'leoDistrictId': '317E',
        'path': d_closed,
        'center': [round(cx, 1), round(cy, 1)]
    })

# Calculate average centers of LEO sub-districts in raw coordinates
leo_sub_districts = ['317A', '317B', '317C', '317D', '317E', '317F', '317G']
leo_centers = {}
for leo_id in leo_sub_districts:
    matching_districts = [d for d in district_data if d['leoDistrictId'] == leo_id and d['name'] != 'Goa']
    if matching_districts:
        avg_x = sum(d['center'][0] for d in matching_districts) / len(matching_districts)
        avg_y = sum(d['center'][1] for d in matching_districts) / len(matching_districts)
        leo_centers[leo_id] = [round(avg_x, 1), round(avg_y, 1)]

if goa_matching := [d for d in district_data if d['id'] == 'goa']:
    leo_centers['GOA'] = goa_matching[0]['center']

# Write out to TypeScript file
ts_content = f"""// This file is auto-generated by generate_map_data.py
// Contains the high-fidelity SVG geographical path boundaries and coordinates.

export interface RevenueDistrictPath {{
  id: string;
  name: string;
  leoDistrictId: string;
  path: string;
  center: [number, number];
}}

export const REVENUE_DISTRICTS: RevenueDistrictPath[] = {json.dumps(district_data, indent=2)};

export const LEO_DISTRICT_CENTERS: Record<string, [number, number]> = {json.dumps(leo_centers, indent=2)};
"""

output_path = 'src/lib/karnatakaMapData.ts'
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, 'w') as f:
    f.write(ts_content)

print(f"Generated {output_path} with {len(district_data)} districts.")
