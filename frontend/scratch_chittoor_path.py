import xml.etree.ElementTree as ET
import generate_map_data

tree = ET.parse('karnataka.svg')
root = tree.getroot()

# 1. Get Chittoor path points (outer boundary)
p_chit = [p for p in root.iter() if p.tag.endswith('path') and p.get('id') == 'path71'][0]
pts_chit = generate_map_data.parse_svg_path_points(p_chit.get('d'))

# 2. Get Kolar points (border segment)
p_kolar = [p for p in root.iter() if p.tag.endswith('path') and p.get('id') == '_x31_91'][0]
pts_kolar_all = generate_map_data.parse_svg_path_points(p_kolar.get('d'))

# Find the indices in Kolar points closest to Chittoor's end point and start point
idx_end_k = -1 # closest to Chittoor's end (1491.27, 1925.57)
idx_start_k = -1 # closest to Chittoor's start (1634.43, 1838.77)
min_d_end = 99999.0
min_d_start = 99999.0

# Chittoor end pt
pt_chit_end = pts_chit[-1]
# Chittoor start pt
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

print("Chittoor end:", pt_chit_end, "closest Kolar point:", pts_kolar_all[idx_end_k], "dist:", min_d_end)
print("Chittoor start:", pt_chit_start, "closest Kolar point:", pts_kolar_all[idx_start_k], "dist:", min_d_start)
print("Kolar indices:", idx_end_k, idx_start_k)

# Slice the Kolar points segment to connect Chittoor end to start
if idx_end_k < idx_start_k:
    pts_kolar = pts_kolar_all[idx_end_k:idx_start_k+1]
else:
    pts_kolar = pts_kolar_all[idx_start_k:idx_end_k+1][::-1]

# Combine points
combined = list(pts_chit)
for pt in pts_kolar:
    # Avoid duplicates
    if (pt[0] - combined[-1][0])**2 + (pt[1] - combined[-1][1])**2 > 1.0:
        combined.append(pt)

# Close
d_closed = "M {:.3f},{:.3f}".format(combined[0][0], combined[0][1])
for pt in combined[1:]:
    d_closed += " L {:.3f},{:.3f}".format(pt[0], pt[1])
d_closed += " Z"

print("Closed path points:", len(combined))
print("Closed path string length:", len(d_closed))
