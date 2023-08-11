#!/usr/bin/env bash
# Prerequisites:
# 1. ripgrep(rust)
# 2. fonttools(python)
set -e
rm -rf ./public/assets/fonts/**/*.subset.*

# 擷取漢字
rg -e '[\u4e00-\u9fff\u3400-\u4DBF\uF900-\uFAFF\uFE30-\uFE4F\u3000\u3001-\u303F]' -oN --no-filename|sort|uniq|tr -d '\n' > output_glyphs_han.txt
glyphs_file_han='output_glyphs_han.txt'

print_glyph_count () {
    font_file="${1}"
    # https://github.com/fonttools/fonttools/issues/1294#issuecomment-404485282
    count=$(ttx -q -o - -t GlyphOrder "${font_file}" | grep -c '<GlyphID id')
    echo "Exported ${count} glyphs to ${font_file}"
}

run_font_subsetter() {
    local font_name="$1";
    local glyphs_file="$2";
    local input_dir="./src/styles/fonts";
    local output_dir="./public/assets/fonts";

    # WOFF2
    echo "${font_name}: Generating subset WOFF2 files .."
    pyftsubset "${input_dir}/${font_name}.ttf" \
        --flavor="woff2" \
        --output-file="${output_dir}/${font_name}.subset.woff2" \
        --text-file=${glyphs_file} \
        --with-zopfli \
        --layout-features=* \
        --glyph-names \
        --symbol-cmap \
        --legacy-cmap \
        --notdef-glyph \
        --notdef-outline \
        --recommended-glyphs \
        --name-legacy \
        --no-subset-tables+=FFTM,feat,morx \
        --name-IDs='*' \
        --name-languages='*'
    print_glyph_count "${output_dir}/${font_name}.subset.woff2"
}

run_font_subsetter "LXGWWenKaiMonoTC-Regular" $glyphs_file_han
rm -rf ./output_glyphs*.txt

echo "Done!"
