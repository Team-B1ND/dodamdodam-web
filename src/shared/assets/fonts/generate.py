"""Copy unchanged Pretendard v1.3.9 WOFF2 files and regenerate their CSS."""

from pathlib import Path
import re
import shutil
import sys
import subprocess

from fontTools.ttLib import TTFont

source = Path(sys.argv[1])
target = Path(__file__).resolve().parent


def unicode_range(codepoints):
    runs = []
    for point in sorted(codepoints):
        if runs and point == runs[-1][1] + 1:
            runs[-1][1] = point
        else:
            runs.append([point, point])
    return ", ".join(
        f"U+{start:X}" if start == end else f"U+{start:X}-{end:X}"
        for start, end in runs
    )


def font_face(weight, path, ranges):
    destination = target / path
    destination.parent.mkdir(exist_ok=True)
    shutil.copyfile(source / path, destination)
    return f'''@font-face {{
  font-family: "Pretendard";
  font-style: normal;
  font-weight: {weight};
  font-display: swap;
  src: url("./{path}") format("woff2");
  unicode-range: {ranges};
}}
'''


faces = []
coverage = {}
names = {}
upstream_css = (source / "pretendard-dynamic-subset.css").read_text()
for block in re.findall(r"@font-face\s*\{([^}]+)\}", upstream_css):
    weight = int(re.search(r"font-weight:\s*(\d+);", block).group(1))
    path = re.search(r"url\(\./([^)]*woff2)\)", block).group(1)
    declared = set()
    for item in re.search(r"unicode-range:\s*([^;]+);", block).group(1).split(","):
        edges = item.strip()[2:].split("-")
        declared.update(range(int(edges[0], 16), int(edges[-1], 16) + 1))
    mapped = declared & set(TTFont(source / path).getBestCmap())
    covered = coverage.setdefault(weight, set())
    assert not covered & mapped
    covered.update(mapped)
    basename, part = Path(path).name.split(".subset.")
    names[weight] = basename
    faces.append((int(part.split(".")[0]) + 1, weight, font_face(weight, path, unicode_range(mapped))))

assert set(coverage) == set(range(100, 1000, 100))
for weight, basename in names.items():
    path = f"woff2/{basename}.woff2"
    font = TTFont(source / path)
    original = TTFont(source / "woff" / f"{basename}.woff")
    assert font["name"].getDebugName(5) == "Version 1.309"
    assert font["OS/2"].usWeightClass == weight
    assert set(font.getBestCmap()) == set(original.getBestCmap())
    assert len(font.getBestCmap()) == 14336 and len(coverage[weight]) == 12029
    faces.append((0, weight, font_face(weight, path, "U+0-10FFFF")))

# The complete face stays eligible for combining clusters; later subsets win for ordinary text.
header = "/* Official Pretendard v1.3.9. Keep full faces before subsets for combining clusters. See README.md and OFL.txt. */\n\n"
(target / "pretendard.css").write_text(header + "\n".join(face for _, _, face in sorted(faces)))
shutil.copyfile(source.parents[1] / "LICENSE.txt", target / "OFL.txt")
subprocess.run(["pnpm", "exec", "prettier", str(target / "pretendard.css"), "--write"], check=True)
print(f"Generated {len(faces)} faces, preserving all 14336 codepoints at weights 100-900")
