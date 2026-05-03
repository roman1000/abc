import struct, zlib, math

def make_png(size):
    w = h = size
    img = [[(79, 126, 248)] * w for _ in range(h)]

    def set_px(x, y, r, g, b):
        if 0 <= x < w and 0 <= y < h:
            img[y][x] = (r, g, b)

    def fill_rect(x, y, rw, rh, r, g, b):
        for dy in range(rh):
            for dx in range(rw):
                set_px(x + dx, y + dy, r, g, b)

    def aa_circle(cx, cy, radius, r, g, b):
        for dy in range(-radius - 1, radius + 2):
            for dx in range(-radius - 1, radius + 2):
                dist = math.sqrt(dx*dx + dy*dy)
                if dist < radius:
                    set_px(cx + dx, cy + dy, r, g, b)

    s = size / 512

    # Rounded background already blue
    # Round corners by painting bg color (f0f4f8 -> just cut)
    corner_r = int(100 * s)
    for y in range(corner_r):
        for x in range(corner_r):
            d = math.sqrt((corner_r - x)**2 + (corner_r - y)**2)
            if d > corner_r:
                img[y][x] = (240, 244, 248)
            d = math.sqrt((corner_r - (w - 1 - x))**2 + (corner_r - y)**2)
            if d > corner_r:
                img[y][w - 1 - x] = (240, 244, 248)
        for x in range(corner_r):
            d = math.sqrt((corner_r - x)**2 + (corner_r - (h - 1 - y))**2)
            if d > corner_r:
                img[h - 1 - y][x] = (240, 244, 248)
            d = math.sqrt((corner_r - (w - 1 - x))**2 + (corner_r - (h - 1 - y))**2)
            if d > corner_r:
                img[h - 1 - y][w - 1 - x] = (240, 244, 248)

    # Fork - left tine
    fill_rect(int(148*s), int(120*s), int(24*s), int(160*s), 255, 255, 255)
    # Fork - right tine
    fill_rect(int(196*s), int(120*s), int(24*s), int(100*s), 255, 255, 255)
    # Fork - crossbar
    fill_rect(int(148*s), int(200*s), int(72*s), int(24*s), 255, 255, 255)
    # Fork - handle
    fill_rect(int(184*s), int(240*s), int(24*s), int(160*s), 255, 255, 255)

    # Flame (simplified as filled ellipse)
    cx = int(318 * s)
    cy = int(300 * s)
    rx = int(45 * s)
    ry = int(90 * s)
    for dy in range(-ry, ry + 1):
        for dx in range(-rx, rx + 1):
            if (dx/rx)**2 + (dy/ry)**2 <= 1:
                set_px(cx + dx, cy + dy, 255, 255, 255)

    # Inner flame
    cx2 = int(318 * s)
    cy2 = int(320 * s)
    rx2 = int(20 * s)
    ry2 = int(45 * s)
    for dy in range(-ry2, ry2 + 1):
        for dx in range(-rx2, rx2 + 1):
            if (dx/rx2)**2 + (dy/ry2)**2 <= 1:
                set_px(cx2 + dx, cy2 + dy, 251, 191, 36)

    # Encode PNG
    def chunk(name, data):
        c = name + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)

    raw = b''
    for row in img:
        raw += b'\x00' + bytes([v for px in row for v in px])
    compressed = zlib.compress(raw, 9)

    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
    png += chunk(b'IDAT', compressed)
    png += chunk(b'IEND', b'')
    return png

for size, name in [(192, 'icon-192.png'), (512, 'icon-512.png')]:
    with open(name, 'wb') as f:
        f.write(make_png(size))
    print(f'{name} done')
