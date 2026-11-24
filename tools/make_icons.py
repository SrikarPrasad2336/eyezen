"""Draws the EyeZen app icons into public/icons.
Run from the project root:  python tools/make_icons.py
Needs Pillow:  pip install pillow

Design: a glowing lotus-eye on a deep ocean-to-teal gradient.
"""
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

OUT = Path("public/icons")
OUT.mkdir(parents=True, exist_ok=True)

BIG = 1024  # draw large, then shrink for smooth edges

TEAL = (47, 143, 157)
DEEP = (10, 38, 54)
GLOW = (120, 205, 212)
CREAM = (251, 246, 236)
EYE_WHITE = (255, 251, 243)
CORAL = (232, 118, 95)
WHITE = (255, 255, 255)


def bezier(p0, p1, p2, p3, steps=60):
    points = []
    for i in range(steps + 1):
        t = i / steps
        u = 1 - t
        x = u**3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t**3 * p3[0]
        y = u**3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t**3 * p3[1]
        points.append((x, y))
    return points


# The almond eye shape, in a 64 x 64 drawing space (56 units wide)
EYE = (
    bezier((4, 34), (11, 21), (21, 14), (32, 14))
    + bezier((32, 14), (43, 14), (53, 21), (60, 34))[1:]
    + bezier((60, 34), (53, 47), (43, 54), (32, 54))[1:]
    + bezier((32, 54), (21, 54), (11, 47), (4, 34))[1:]
)


def petal(cx, cy, angle, length, width, steps=40):
    """A pointed petal starting at (cx, cy) and pointing along `angle`."""
    shape = []
    for i in range(steps + 1):
        t = i / steps
        shape.append((length * t, width / 2 * math.sin(math.pi * t)))
    for i in range(steps, -1, -1):
        t = i / steps
        shape.append((length * t, -width / 2 * math.sin(math.pi * t)))
    ca, sa = math.cos(angle), math.sin(angle)
    return [(cx + x * ca - y * sa, cy + x * sa + y * ca) for x, y in shape]


def background():
    gradient = Image.linear_gradient("L").resize((BIG, BIG))  # top = 0, bottom = 255
    top = Image.new("RGB", (BIG, BIG), TEAL)
    bottom = Image.new("RGB", (BIG, BIG), DEEP)
    base = Image.composite(bottom, top, gradient)

    # A soft glow in the middle
    mask = Image.new("L", (BIG, BIG), 0)
    ImageDraw.Draw(mask).ellipse((BIG * 0.2, BIG * 0.2, BIG * 0.8, BIG * 0.8), fill=110)
    mask = mask.filter(ImageFilter.GaussianBlur(BIG * 0.12))
    return Image.composite(Image.new("RGB", (BIG, BIG), GLOW), base, mask)


def draw_icon(logo_fraction):
    """logo_fraction: how much of the icon's width the eye covers."""
    img = background().convert("RGBA")
    u = BIG * logo_fraction  # width of the eye
    k = u / 56  # pixels per drawing unit
    cx = cy = BIG / 2

    # Ripple rings
    rings = Image.new("RGBA", (BIG, BIG), (0, 0, 0, 0))
    ring_draw = ImageDraw.Draw(rings)
    for radius, alpha in ((0.55, 70), (0.78, 45), (1.0, 28)):
        r = u * radius
        ring_draw.ellipse(
            (cx - r, cy - r, cx + r, cy + r),
            outline=CREAM + (alpha,),
            width=max(3, int(u * 0.006)),
        )
    img = Image.alpha_composite(img, rings)

    # Lotus blossom: a long outer layer and a shorter inner layer
    outer = Image.new("RGBA", (BIG, BIG), (0, 0, 0, 0))
    inner = Image.new("RGBA", (BIG, BIG), (0, 0, 0, 0))
    outer_draw = ImageDraw.Draw(outer)
    inner_draw = ImageDraw.Draw(inner)
    for n in range(8):
        angle = math.radians(-90 + n * 45)
        outer_draw.polygon(petal(cx, cy, angle, u * 0.62, u * 0.27), fill=CREAM + (85,))
        angle = math.radians(-90 + 22.5 + n * 45)
        inner_draw.polygon(petal(cx, cy, angle, u * 0.46, u * 0.21), fill=CREAM + (125,))
    img = Image.alpha_composite(img, outer)
    img = Image.alpha_composite(img, inner)

    # The eye, with a soft glow behind it
    def place(point):
        return (cx + (point[0] - 32) * k, cy + (point[1] - 34) * k)

    eye = [place(p) for p in EYE]
    glow = Image.new("L", (BIG, BIG), 0)
    ImageDraw.Draw(glow).polygon(eye, fill=200)
    glow = glow.filter(ImageFilter.GaussianBlur(u * 0.05))
    img = Image.composite(Image.new("RGBA", (BIG, BIG), GLOW + (255,)), img, glow)

    draw = ImageDraw.Draw(img)
    draw.polygon(eye, fill=EYE_WHITE)

    # Iris: darker at the edge, glowing toward the middle
    steps = 24
    for i in range(steps):
        t = i / (steps - 1)
        r = 11 * k * (1 - t * 0.85)
        color = tuple(int(a + (b - a) * t) for a, b in zip((30, 105, 120), (125, 208, 214)))
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=color)

    # Pupil and sparkles of light
    pupil = 5 * k
    draw.ellipse((cx - pupil, cy - pupil, cx + pupil, cy + pupil), fill=DEEP)
    hx, hy, hr = cx + 4 * k, cy - 4 * k, 2.4 * k
    draw.ellipse((hx - hr, hy - hr, hx + hr, hy + hr), fill=WHITE)
    hx, hy, hr = cx - 3.5 * k, cy + 3.5 * k, 1.1 * k
    draw.ellipse((hx - hr, hy - hr, hx + hr, hy + hr), fill=WHITE)

    # A coral spark at the tip of the top petal
    sx, sy = cx, cy - u * 0.62
    halo = Image.new("RGBA", (BIG, BIG), (0, 0, 0, 0))
    halo_draw = ImageDraw.Draw(halo)
    hr = u * 0.09
    halo_draw.ellipse((sx - hr, sy - hr, sx + hr, sy + hr), fill=CORAL + (90,))
    img = Image.alpha_composite(img, halo)
    draw = ImageDraw.Draw(img)
    dr = u * 0.045
    draw.ellipse((sx - dr, sy - dr, sx + dr, sy + dr), fill=CORAL)

    return img.convert("RGB")


def save(image, name, size):
    image.resize((size, size), Image.LANCZOS).save(OUT / name, optimize=True)
    print("saved", OUT / name)


regular = draw_icon(0.70)
maskable = draw_icon(0.50)  # smaller, so phones can crop it into any shape safely

save(regular, "icon-192.png", 192)
save(regular, "icon-512.png", 512)
save(maskable, "maskable-512.png", 512)
save(regular, "apple-touch-icon.png", 180)
save(regular, "favicon-32.png", 32)
print("Done.")