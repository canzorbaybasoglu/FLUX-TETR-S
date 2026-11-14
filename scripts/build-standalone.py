from pathlib import Path
root=Path(__file__).resolve().parent.parent
html=(root/'dist/index.html').read_text()
for css in ['style.css','arcade.css','mobile.css']:
    html=html.replace(f'<link rel="stylesheet" href="{css}">','<style>\n'+(root/'dist'/css).read_text()+'\n</style>')
engine=(root/'dist/engine.mjs').read_text().replace('export ','')
app=(root/'dist/app.mjs').read_text().split('\n',1)[1]
html=html.replace('<script type="module" src="app.mjs"></script>','<script>\n(()=>{\n'+engine+'\n'+app+'\n})();\n</script>')
(root/'index.html').write_text(html)
print('Built self-contained index.html: no external assets, no module loader, no network dependency.')
