(() => {
  const dialog = document.querySelector('#demo-dialog');
  const content = document.querySelector('#demo-content');
  let opener;
  const el = (tag, text, cls) => { const node = document.createElement(tag); if (text) node.textContent = text; if (cls) node.className = cls; return node; };
  const status = () => { const n = el('p', '', 'result'); n.setAttribute('aria-live', 'polite'); return n; };
  const button = (text, fn) => { const b = el('button', text, 'button'); b.type = 'button'; b.addEventListener('click', fn); return b; };
  const demos = {
    compass() {
      content.append(el('p', 'Kompas virtual untuk belajar sudut, bukan sensor arah perangkat. Geser sudut untuk menjelajahi delapan arah mata angin.'));
      const face = el('div', '', 'compass-face'); face.setAttribute('aria-hidden', 'true');
      [['U','north'],['T','east'],['S','south'],['B','west']].forEach(([t,c]) => face.append(el('span',t,c)));
      const needle = el('i','','needle'); face.append(needle);
      const label = el('label','Sudut arah (0–359°)'); label.htmlFor = 'angle';
      const input = el('input'); input.type = 'range'; input.id = 'angle'; input.min = '0'; input.max = '359'; input.value = '0';
      const output = status();
      const update = () => { const n = Number(input.value); needle.style.transform = `rotate(${n}deg)`; output.textContent = `${n}° · ${['Utara','Timur Laut','Timur','Tenggara','Selatan','Barat Daya','Barat','Barat Laut'][Math.round(n/45)%8]}`; };
      input.addEventListener('input', update);
      content.append(face,label,input,output,button('Kembali ke utara', () => { input.value = '0'; update(); })); update();
    },
    cleanup() {
      content.append(el('p','Ambil enam sampah dengan menekan tombolnya. Biarkan kerang, ikan, dan makhluk laut tetap di pantai.'));
      const grid = el('div','','cleanup-grid'); const output = status(); let count = 0;
      const reset = () => {
        count = 0; grid.replaceChildren(); output.textContent = 'Terkumpul: 0 dari 6 sampah.';
        const items = [['🧴','Botol plastik',true],['🥫','Kaleng bekas',true],['🛍','Kantong plastik',true],['🥤','Gelas plastik',true],['📰','Kertas bekas',true],['📦','Kardus bekas',true],['🐚','Kerang',false],['🦀','Kepiting',false],['🐠','Ikan',false],['⭐','Bintang laut',false],['🐢','Penyu',false],['🪸','Karang',false]];
        for(let i=items.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [items[i],items[j]]=[items[j],items[i]]; }
        items.forEach(([icon,name,trash]) => {
          const b = button(icon, () => {
            if (b.disabled) return;
            if (!trash) { output.textContent = `${name} adalah bagian dari laut. Biarkan tetap di sana. Terkumpul: ${count}/6.`; return; }
            b.disabled = true; b.textContent = '✓'; b.setAttribute('aria-label',`${name} sudah dikumpulkan`); count++;
            output.textContent = count===6 ? 'Pantainya bersih! Keenam sampah berhasil dikumpulkan. Terima kasih sudah menjaga laut.' : `Terkumpul: ${count} dari 6 sampah.`;
          });
          b.setAttribute('aria-label',name); b.title = name; grid.append(b);
        });
      };
      content.append(grid,output,button('Main lagi ↻',reset)); reset();
    },
    morse() {
      const codes = ['.-','-...','-.-.','-..','.','..-.','--.','....','..','.---','-.-','.-..','--','-.','---','.--.','--.-','.-.','...','-','..-','...-','.--','-..-','-.--','--..','-----','.----','..---','...--','....-','.....','-....','--...','---..','----.'];
      const map = Object.fromEntries([...('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')].map((c,i)=>[c,codes[i]]));
      content.append(el('p','Terjemahkan huruf A–Z dan angka 0–9. Garis miring memisahkan kata. Ini simulasi kode, tidak mengirim pesan ke siapa pun.'));
      const label = el('label','Pesanmu (maksimal 200 karakter)'); label.htmlFor = 'morse-text';
      const input = el('textarea'); input.id = 'morse-text'; input.maxLength = 200; input.rows = 3; input.value = 'HALO LAUT';
      const output = status(); output.className = 'result morse-result'; const legend = el('p','','morse-legend');
      const update = () => {
        const value = input.value.trim().toUpperCase(); legend.textContent = '';
        if(!value) { output.textContent = 'Tulis pesan terlebih dahulu.'; return; }
        if(/[^A-Z0-9\s]/.test(value)) { output.textContent = 'Gunakan huruf A–Z, angka 0–9, dan spasi saja.'; return; }
        output.textContent = value.split(/\s+/).map(word => [...word].map(c=>map[c]).join(' ')).join(' / ');
        legend.textContent = 'Panduan karakter:\n' + [...new Set(value.replace(/\s/g,''))].map(c=>`${c} = ${map[c]}`).join('   ');
      };
      content.append(label,input,button('Terjemahkan pesan',update),output,legend); update();
    }
  };
  document.querySelectorAll('[data-demo]').forEach(b => { b.hidden = false; b.addEventListener('click',()=>{
    opener = b; content.replaceChildren(); document.querySelector('#demo-title').textContent = {compass:'Kompas Jelajah',cleanup:'Pantai Bersih',morse:'Pesan Mercusuar'}[b.dataset.demo]; demos[b.dataset.demo](); dialog.showModal();
  }); });
  document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>opener?.focus());
  dialog.addEventListener('click',e=>{ if(e.target===dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
})();
