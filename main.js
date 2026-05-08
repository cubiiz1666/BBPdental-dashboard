const SHEET_ID='1utCuqqSUxPSAws16j2mdRLlGowPerRpN4tH5a5Ezeyo';
const SHEET_NAME='DATAMASTER01';
const COL={province:'province',school:'school',pct:'Percentage',gg:'BPP',type:'type',year:'year'};

// Health Zone Map (province → เขตสุขภาพ กรมอนามัย)
const HZ_MAP={"กระบี่":11,"กรุงเทพมหานคร":13,"กาญจนบุรี":5,"กาฬสินธุ์":7,"กำแพงเพชร":3,"ขอนแก่น":7,"จันทบุรี":6,"ฉะเชิงเทรา":6,"ชลบุรี":6,"ชัยนาท":3,"ชัยภูมิ":9,"ชุมพร":11,"ตรัง":12,"ตราด":6,"ตาก":2,"นครนายก":4,"นครปฐม":5,"นครพนม":8,"นครราชสีมา":9,"นครศรีธรรมราช":11,"นครสวรรค์":3,"นนทบุรี":4,"นราธิวาส":12,"น่าน":1,"บึงกาฬ":8,"บุรีรัมย์":9,"ปทุมธานี":4,"ประจวบคีรีขันธ์":5,"ปราจีนบุรี":6,"ปัตตานี":12,"พระนครศรีอยุธยา":4,"พะเยา":1,"พังงา":11,"พัทลุง":12,"พิจิตร":3,"พิษณุโลก":2,"ภูเก็ต":11,"มหาสารคาม":7,"มุกดาหาร":10,"ยะลา":12,"ยโสธร":10,"ระนอง":11,"ระยอง":6,"ราชบุรี":5,"ร้อยเอ็ด":7,"ลพบุรี":4,"ลำปาง":1,"ลำพูน":1,"ศรีสะเกษ":10,"สกลนคร":8,"สงขลา":12,"สตูล":12,"สมุทรสงคราม":5,"สมุทรสาคร":5,"สระบุรี":4,"สระแก้ว":6,"สิงห์บุรี":4,"สุพรรณบุรี":5,"สุราษฎร์ธานี":11,"สุรินทร์":9,"สุโขทัย":2,"หนองคาย":8,"หนองบัวลำภู":8,"อำนาจเจริญ":10,"อุดรธานี":8,"อุตรดิตถ์":2,"อุทัยธานี":3,"อุบลราชธานี":10,"อ่างทอง":4,"เชียงราย":1,"เชียงใหม่":1,"เพชรบุรี":5,"เพชรบูรณ์":2,"เลย":8,"แพร่":1,"แม่ฮ่องสอน":1};
const HZ_ACTIVE=[1,2,5,6,8,9,10,11,12];
const HZ_BG={1:'rgba(244,165,181,.75)',2:'rgba(148,216,190,.75)',5:'rgba(155,191,238,.75)',6:'rgba(250,196,128,.75)',8:'rgba(195,178,238,.75)',9:'rgba(255,230,102,.75)',10:'rgba(180,220,240,.75)',11:'rgba(220,195,250,.75)',12:'rgba(240,200,160,.75)'};
const HZ_BD={1:'#F4A5B5',2:'#94D8BE',5:'#9BBFEE',6:'#FAC480',8:'#C3B2EE',9:'#FFE066',10:'#B4DCF0',11:'#DCC3FA',12:'#F0C8A0'};
const HZ_GD={1:'#F4A5B5,#FAC480',2:'#94D8BE,#9BBFEE',5:'#9BBFEE,#C3B2EE',6:'#FAC480,#F4A5B5',8:'#C3B2EE,#DCC3FA',9:'#FFE066,#94D8BE',10:'#B4DCF0,#9BBFEE',11:'#DCC3FA,#C3B2EE',12:'#F0C8A0,#FAC480'};
const BPP_Z={1:'ภาค 1 (กลาง)',2:'ภาค 2 (อีสาน)',3:'ภาค 3 (เหนือ)',4:'ภาค 4 (ใต้)'};
const BPP_BG=['rgba(244,165,181,.8)','rgba(148,216,190,.8)','rgba(155,191,238,.8)','rgba(250,196,128,.8)'];
const BPP_BD2=['#F4A5B5','#94D8BE','#9BBFEE','#FAC480'];
const CLR={
  caries: {bg:'rgba(244,165,181,.75)',bd:'#F4A5B5'},
  cavfree:{bg:'rgba(148,216,190,.75)',bd:'#94D8BE'},
  cfree:  {bg:'rgba(155,191,238,.75)',bd:'#9BBFEE'},
  diag:   {bg:'rgba(250,196,128,.75)',bd:'#FAC480'},
  svc:    {bg:'rgba(195,178,238,.75)',bd:'#C3B2EE'}
};
const PAL=['rgba(244,165,181,.8)','rgba(148,216,190,.8)','rgba(155,191,238,.8)','rgba(250,196,128,.8)','rgba(195,178,238,.8)','rgba(255,230,102,.8)','rgba(180,220,240,.8)','rgba(220,195,250,.8)','rgba(240,200,160,.8)','rgba(200,230,180,.8)'];
const PAL_BD=['#F4A5B5','#94D8BE','#9BBFEE','#FAC480','#C3B2EE','#FFE066','#B4DCF0','#DCC3FA','#F0C8A0','#C8E6B4'];
const F={family:"'Sarabun', sans-serif",size:12};

let RAW=[],C={},cmpSel=[],mTmp=[];

function avg(a){return a.length?a.reduce(function(s,v){return s+v;},0)/a.length:0;}
function r1(v){return Math.round(v*10)/10;}
function mk(id,cfg){if(C[id])C[id].destroy();C[id]=new Chart(document.getElementById(id).getContext('2d'),cfg);}
function tsNow(){return new Date().toLocaleString('th-TH',{hour:'2-digit',minute:'2-digit',day:'numeric',month:'short',year:'numeric'});}
function bppZ(gg){return Math.floor(gg/10);}
function caTag(v){
  if(v>=20) return '<span class="pill pr">'+v+'%</span>';
  if(v>=10) return '<span class="pill po">'+v+'%</span>';
  return '<span class="pill pg">'+v+'%</span>';
}

// ===== FETCH =====
async function fetchWithTimeout(url,ms){
  var ctrl=new AbortController();
  var tid=setTimeout(function(){ctrl.abort();},ms||10000);
  try{
    var res=await fetch(url,{cache:'no-store',signal:ctrl.signal});
    clearTimeout(tid);
    return res;
  }catch(e){clearTimeout(tid);throw e;}
}

async function fetchSheetData(){
  var ENC=encodeURIComponent(SHEET_NAME);
  var BASE='https://docs.google.com/spreadsheets/d/'+SHEET_ID;
  var urls=[
    BASE+'/gviz/tq?tqx=out:csv&sheet='+ENC+'&headers=1',
    BASE+'/gviz/tq?tqx=out:csv&gid=0&headers=1',
    BASE+'/export?format=csv&sheet='+ENC,
    'https://api.allorigins.win/raw?url='+encodeURIComponent(BASE+'/gviz/tq?tqx=out:csv&sheet='+ENC),
    'https://corsproxy.io/?'+encodeURIComponent(BASE+'/gviz/tq?tqx=out:csv&sheet='+ENC),
  ];
  var lastErr;
  for(var i=0;i<urls.length;i++){
    try{
      var res=await fetchWithTimeout(urls[i],10000);
      if(!res.ok) throw new Error('HTTP '+res.status);
      var t=await res.text();
      if(!t||t.trim().length<20) throw new Error('empty');
      if(t.trim().startsWith('<')) throw new Error('got HTML');
      return parseCSV(t);
    }catch(e){lastErr=e;}
  }
  throw lastErr||new Error('all failed');
}

function parseCSV(text){
  var lines=text.trim().split('\n');
  if(lines.length<2) throw new Error('too few rows');
  var hdr=csvLine(lines[0]);
  var rows=[];
  for(var i=1;i<lines.length;i++){
    var v=csvLine(lines[i]);
    if(v.every(function(x){return !x.trim();})) continue;
    var obj={};
    hdr.forEach(function(h,idx){obj[h.trim()]=(v[idx]||'').trim();});
    rows.push(obj);
  }
  return rows;
}

function csvLine(line){
  var r=[],cur='',inQ=false;
  for(var i=0;i<line.length;i++){
    var ch=line[i];
    if(ch==='"'){inQ=!inQ;}
    else if(ch===','&&!inQ){r.push(cur);cur='';}
    else{cur+=ch;}
  }
  r.push(cur);
  return r;
}

function parseRaw(rows){
  // รองรับทั้ง header ใหม่ (ไม่มีไทย) และเก่า
  var tm={
    'caries':'Table_caries','cavityfree':'Table_cavityfree','cariesfree':'Table_cariesfree',
    'diagnosis':'Table_diagnosis','service':'Table_service',
    'table_caries':'Table_caries','table_cavityfree':'Table_cavityfree',
    'table_cariesfree':'Table_cariesfree','table_diagnosis':'Table_diagnosis','table_service':'Table_service'
  };
  // ตรวจ header ที่มีจริง
  var sample=rows[0]||{};
  var keys=Object.keys(sample);
  // map คอลัมน์ — รองรับทั้งรูปแบบเก่าและใหม่
  function getCol(row,candidates){
    for(var i=0;i<candidates.length;i++){
      if(row[candidates[i]]!==undefined) return row[candidates[i]]||'';
    }
    return '';
  }
  return rows.filter(function(r){
    return getCol(r,['province','จังหวัด'])&&getCol(r,['type','รายการ']);
  }).map(function(r){
    var prov=String(getCol(r,['province','จังหวัด'])).trim();
    var rt=String(getCol(r,['type','รายการ'])||'').trim().toLowerCase().replace(/\s+/g,'');
    var gg=parseInt(String(getCol(r,['BPP','gg','กก.ตชด.'])||'0').replace(/,/g,''))||0;
    var rawPct=String(getCol(r,['Percentage','pct','ร้อยละ'])||'0').replace(/,/g,'.');
    var rawYear=String(getCol(r,['year','ปี'])||'').replace(/,/g,'');
    return {
      province: prov,
      school:   String(getCol(r,['school','โรงเรียน'])||'').trim(),
      pct:      parseFloat(rawPct)||0,
      gg:       gg,
      bppZone:  bppZ(gg),
      hz:       HZ_MAP[prov]||0,
      type:     tm[rt]||('Table_'+rt),
      year:     parseInt(rawYear)||0
    };
  });
}

// ===== LOAD =====
async function fetchAndRender(){
  setSpin(true);
  setLoad(false); // ซ่อน loading (ถ้าเปิดอยู่)

  // โหลด data.json (local fallback)
  var localOK=false;
  try{
    document.getElementById('stxt').textContent='กำลังโหลดข้อมูล...';
    var r=await fetch('data.json');
    if(!r.ok) throw new Error('data.json HTTP '+r.status);
    var arr=await r.json();
    RAW=arr.map(function(d){
      return {
        province:String(d.province||''),
        school:  String(d.school||''),
        pct:     parseFloat(d.pct)||0,
        gg:      parseInt(d.gg)||0,
        bppZone: parseInt(d.bz)||bppZ(parseInt(d.gg)||0),
        hz:      parseInt(d.hz)||0,
        type:    String(d.type||''),
        year:    parseInt(d.year)||0
      };
    });
    if(RAW.length){
      buildFilters();
      updateOverview();
      setSt(true,'โหลดสำเร็จ '+RAW.length.toLocaleString()+' แถว');
      localOK=true;
    }
  }catch(e){
    console.warn('data.json failed:',e.message);
    var cached=loadCache();
    if(cached&&cached.length){
      RAW=cached;
      buildFilters();updateOverview();
      setSt(false,'ใช้ Cache '+RAW.length.toLocaleString()+' แถว');
      localOK=true;
    }
  }

  // ลอง Google Sheets ใน background
  try{
    var fresh=await fetchSheetData();
    var parsed=parseRaw(fresh);
    if(parsed.length){
      RAW=parsed;
      buildFilters();updateOverview();
      setSt(true,'อัปเดตจาก Google Sheets '+RAW.length.toLocaleString()+' แถว '+tsNow());
      document.getElementById('ebox').style.display='none';
      saveCache(RAW);
    }
  }catch(e){
    console.warn('Sheet:',e.message);
    if(localOK){
      setSt(true,'ข้อมูล Local '+RAW.length.toLocaleString()+' แถว (Sheets offline)');
    }else{
      document.getElementById('ebox').style.display='block';
      document.getElementById('ebox').innerHTML=
        '<b>โหลดไม่ได้</b> '+e.message+
        ' <button onclick="fetchAndRender()" style="margin-left:10px;background:var(--lav);border:none;border-radius:6px;padding:4px 12px;cursor:pointer;font-family:inherit;">ลองใหม่</button>';
      setSt(false,'โหลดไม่สำเร็จ');
    }
  }
  setSpin(false);
}

function setLoad(s){document.getElementById('lov').classList.toggle('hidden',!s);}
function setSpin(s){document.getElementById('btnr').classList.toggle('spinning',s);}
function setSt(ok,msg){
  document.getElementById('sdot').className='dot'+(ok?'':' err');
  document.getElementById('stxt').textContent=msg;
}
function saveCache(d){try{localStorage.setItem('dental_v3',JSON.stringify({ts:Date.now(),data:d}));}catch(e){}}
function loadCache(){
  try{
    var c=JSON.parse(localStorage.getItem('dental_v3')||'null');
    if(c&&Date.now()-c.ts<25*3600*1000) return c.data;
  }catch(e){}
  return null;
}
function scheduleAutoRefresh(){
  var nw=new Date(),nx=new Date();
  nx.setHours(9,0,0,0);
  if(nx<=nw) nx.setDate(nx.getDate()+1);
  setTimeout(function(){fetchAndRender();setInterval(fetchAndRender,24*3600*1000);},nx-nw);
}

// ===== TABS =====
function switchTab(tab,btn){
  document.querySelectorAll('.tc').forEach(function(e){e.classList.remove('active');});
  document.querySelectorAll('.tbtn').forEach(function(e){e.classList.remove('active');});
  document.getElementById('tab-'+tab).classList.add('active');
  btn.classList.add('active');
  var isCmp=(tab==='compare');
  document.getElementById('fb-ov').style.display=isCmp?'none':'block';
  document.getElementById('fb-cmp').style.display=isCmp?'block':'none';
  if(tab==='healthzone') renderHZTab();
  if(tab==='bpp') renderBPPTab();
  if(tab==='compare') renderCmpTab();
}

// ===== FILTERS =====
function buildFilters(){
  var yrs=[...new Set(RAW.map(function(d){return d.year;}))].sort();
  var provs=[...new Set(RAW.map(function(d){return d.province;}))].sort();
  var ggs=[...new Set(RAW.map(function(d){return d.gg;}))].sort(function(a,b){return a-b;});
  var hzs=[...new Set(RAW.map(function(d){return d.hz;}).filter(Boolean))].sort(function(a,b){return a-b;});
  refill('f-year',yrs,function(v){return 'ปี '+v;},function(v){return String(v);});
  refill('f-prov',provs,function(v){return v;},function(v){return v;});
  refill('f-gg',ggs,function(v){return 'กก.'+v;},function(v){return String(v);});
  refill('f-hz',hzs,function(v){return 'เขต '+v;},function(v){return String(v);});
  ['f-year','f-prov','f-gg','f-hz'].forEach(function(id){
    var el=document.getElementById(id);
    el.removeEventListener('change',updateOverview);
    el.addEventListener('change',updateOverview);
  });
  var sch=new Set(RAW.map(function(d){return d.province+'|'+d.school;})).size;
  var pvs=new Set(RAW.map(function(d){return d.province;})).size;
  document.getElementById('sbadge').textContent='📊 '+sch+' โรงเรียน '+pvs+' จังหวัด '+hzs.length+' เขตสุขภาพ';
}

function refill(id,vals,label,value){
  var sel=document.getElementById(id);
  var cur=sel.value;
  while(sel.options.length>1) sel.remove(1);
  vals.forEach(function(v){
    var o=document.createElement('option');
    o.value=value(v);o.textContent=label(v);
    sel.appendChild(o);
  });
  if([...sel.options].some(function(o){return o.value===cur;})) sel.value=cur;
}

function resetFilters(){
  ['f-year','f-prov','f-gg','f-hz'].forEach(function(id){document.getElementById(id).value='all';});
  updateOverview();
}

function getFiltered(){
  var yr=document.getElementById('f-year').value;
  var pv=document.getElementById('f-prov').value;
  var gg=document.getElementById('f-gg').value;
  var hz=document.getElementById('f-hz').value;
  return RAW.filter(function(d){
    if(yr!=='all'&&String(d.year)!==yr) return false;
    if(pv!=='all'&&d.province!==pv) return false;
    if(gg!=='all'&&String(d.gg)!==gg) return false;
    if(hz!=='all'&&String(d.hz)!==hz) return false;
    return true;
  });
}

// ===== OVERVIEW =====
function updateOverview(){
  var data=getFiltered();
  var YEARS=[...new Set(RAW.map(function(d){return d.year;}))].sort();
  function kv(t){var v=data.filter(function(d){return d.type===t;}).map(function(d){return d.pct;});return v.length?r1(avg(v)):0;}
  var kvs={c:kv('Table_caries'),cf:kv('Table_cavityfree'),cfr:kv('Table_cariesfree'),d:kv('Table_diagnosis'),s:kv('Table_service')};
  var sch=new Set(data.map(function(d){return d.province+'|'+d.school;})).size;
  [['c','kpi-c'],['cf','kpi-cf'],['cfr','kpi-cfr'],['d','kpi-d'],['s','kpi-s']].forEach(function(p){
    document.getElementById(p[1]).innerHTML=kvs[p[0]]+'<span>%</span>';
    document.getElementById(p[1]+'s').textContent=sch+' โรงเรียน';
  });

  // Trend
  var tT=['Table_caries','Table_cavityfree','Table_cariesfree','Table_service'];
  var tL=['ฟันผุ','ปลอดฟันผุ','ฟันปลอดโรค','บริการ'];
  var tC=[CLR.caries,CLR.cavfree,CLR.cfree,CLR.svc];
  mk('ch-trend',{type:'line',data:{labels:YEARS.map(function(y){return 'ปี '+y;}),datasets:tT.map(function(t,i){return {label:tL[i],data:YEARS.map(function(y){var v=data.filter(function(d){return d.type===t&&d.year===y;}).map(function(d){return d.pct;});return v.length?r1(avg(v)):null;}),borderColor:tC[i].bd,backgroundColor:tC[i].bg.replace('75)','1)'),fill:true,tension:.4,pointRadius:5,pointBackgroundColor:tC[i].bd};})},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:F,boxWidth:12}}},scales:{y:{beginAtZero:true,max:100,grid:{color:'#EDE9F7'},ticks:{font:F,callback:function(v){return v+'%';}}},x:{grid:{display:false},ticks:{font:F}}}}});

  // Top 10 caries bar
  var pvC={};
  data.filter(function(d){return d.type==='Table_caries';}).forEach(function(d){if(!pvC[d.province])pvC[d.province]=[];pvC[d.province].push(d.pct);});
  var top10=Object.entries(pvC).map(function(e){return [e[0],r1(avg(e[1]))]}).sort(function(a,b){return b[1]-a[1];}).slice(0,10);
  mk('ch-prov',{type:'bar',data:{labels:top10.map(function(p){return p[0];}),datasets:[{label:'ฟันผุ%',data:top10.map(function(p){return p[1];}),backgroundColor:top10.map(function(_,i){return PAL[i%10];}),borderRadius:7,borderSkipped:false}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{beginAtZero:true,grid:{color:'#EDE9F7'},ticks:{font:F,callback:function(v){return v+'%';}}},y:{grid:{display:false},ticks:{font:{family:F.family,size:11}}}}}});

  // กก grouped bar
  var ggL=[...new Set(RAW.map(function(d){return d.gg;}))].sort(function(a,b){return a-b;});
  var ggM={};
  ggL.forEach(function(g){ggM[g]={};});
  data.forEach(function(d){
    if(!ggM[d.gg]) return;
    if(['Table_caries','Table_cavityfree','Table_service'].indexOf(d.type)<0) return;
    if(!ggM[d.gg][d.type]) ggM[d.gg][d.type]=[];
    ggM[d.gg][d.type].push(d.pct);
  });
  var aGg=ggL.filter(function(g){return Object.keys(ggM[g]).length>0;});
  mk('ch-gg',{type:'bar',data:{labels:aGg.map(function(g){return 'กก.'+g;}),datasets:[
    {label:'ฟันผุ',data:aGg.map(function(g){return ggM[g]['Table_caries']?r1(avg(ggM[g]['Table_caries'])):0;}),backgroundColor:CLR.caries.bg,borderColor:CLR.caries.bd,borderWidth:1.5,borderRadius:4},
    {label:'ปลอดฟันผุ',data:aGg.map(function(g){return ggM[g]['Table_cavityfree']?r1(avg(ggM[g]['Table_cavityfree'])):0;}),backgroundColor:CLR.cavfree.bg,borderColor:CLR.cavfree.bd,borderWidth:1.5,borderRadius:4},
    {label:'บริการ',data:aGg.map(function(g){return ggM[g]['Table_service']?r1(avg(ggM[g]['Table_service'])):0;}),backgroundColor:CLR.svc.bg,borderColor:CLR.svc.bd,borderWidth:1.5,borderRadius:4}
  ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:F,boxWidth:12}}},scales:{y:{beginAtZero:true,max:100,grid:{color:'#EDE9F7'},ticks:{font:F,callback:function(v){return v+'%';}}},x:{grid:{display:false},ticks:{font:{family:F.family,size:11}}}}}});

  // Donut
  mk('ch-donut',{type:'doughnut',data:{labels:['ฟันผุ','ปลอดฟันผุ','ฟันปลอดโรค','วินิจฉัย','บริการ'],datasets:[{data:[kvs.c,kvs.cf,kvs.cfr,kvs.d,kvs.s],backgroundColor:[CLR.caries.bg,CLR.cavfree.bg,CLR.cfree.bg,CLR.diag.bg,CLR.svc.bg],borderColor:[CLR.caries.bd,CLR.cavfree.bd,CLR.cfree.bd,CLR.diag.bd,CLR.svc.bd],borderWidth:2,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,cutout:'60%',plugins:{legend:{position:'bottom',labels:{font:F,boxWidth:12,padding:10}}}}});

  // Scatter
  var scP={};
  data.filter(function(d){return d.type==='Table_caries'||d.type==='Table_cavityfree';}).forEach(function(d){
    if(!scP[d.province]) scP[d.province]={c:[],cf:[]};
    if(d.type==='Table_caries') scP[d.province].c.push(d.pct);
    else scP[d.province].cf.push(d.pct);
  });
  var pts=Object.entries(scP).filter(function(e){return e[1].c.length&&e[1].cf.length;}).map(function(e){return {x:r1(avg(e[1].c)),y:r1(avg(e[1].cf)),p:e[0]};});
  mk('ch-scatter',{type:'scatter',data:{datasets:[{label:'จังหวัด',data:pts.map(function(p){return {x:p.x,y:p.y,p:p.p};}),backgroundColor:'rgba(195,178,238,.7)',borderColor:'#C3B2EE',borderWidth:1.5,pointRadius:7,pointHoverRadius:10}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){return c.raw.p+' ฟันผุ:'+c.raw.x+'% ปลอดฟันผุ:'+c.raw.y+'%';}}}},scales:{x:{title:{display:true,text:'ฟันผุ (%)',font:F},grid:{color:'#EDE9F7'},ticks:{font:F}},y:{title:{display:true,text:'ปลอดฟันผุ (%)',font:F},grid:{color:'#EDE9F7'},ticks:{font:F}}}}});

  // Histogram
  var bkts=[0,5,10,15,20,25,30,40,50,100];
  var bL=bkts.slice(0,-1).map(function(b,i){return b+'-'+bkts[i+1];});
  var cAvgs=Object.values(pvC).map(function(v){return avg(v);});
  mk('ch-hist',{type:'bar',data:{labels:bL,datasets:[{label:'จำนวนจังหวัด',data:bkts.slice(0,-1).map(function(b,i){return cAvgs.filter(function(v){return v>=b&&v<bkts[i+1];}).length;}),backgroundColor:'rgba(244,165,181,.75)',borderColor:'#F4A5B5',borderWidth:1.5,borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{font:F,stepSize:1},grid:{color:'#EDE9F7'}},x:{grid:{display:false},ticks:{font:{family:F.family,size:10}}}}}});

  // Table
  var pvS={};
  data.forEach(function(d){
    if(!pvS[d.province]) pvS[d.province]={gg:d.gg,hz:d.hz,sch:new Set(),c:[],cf:[],cfr:[],dg:[],sv:[],cByY:{}};
    pvS[d.province].sch.add(d.school);
    if(d.type==='Table_caries'){
      pvS[d.province].c.push(d.pct);
      if(!pvS[d.province].cByY[d.year]) pvS[d.province].cByY[d.year]=[];
      pvS[d.province].cByY[d.year].push(d.pct);
    }
    if(d.type==='Table_cavityfree') pvS[d.province].cf.push(d.pct);
    if(d.type==='Table_cariesfree') pvS[d.province].cfr.push(d.pct);
    if(d.type==='Table_diagnosis')  pvS[d.province].dg.push(d.pct);
    if(d.type==='Table_service')    pvS[d.province].sv.push(d.pct);
  });
  var rows=Object.entries(pvS).map(function(e){
    var p=e[0],v=e[1];
    var cVal=r1(avg(v.c));
    var yrs=YEARS.filter(function(y){return v.cByY[y]&&v.cByY[y].length;});
    var trend='';
    if(yrs.length>=2){
      var diff=r1(avg(v.cByY[yrs[yrs.length-1]])-avg(v.cByY[yrs[0]]));
      if(diff>1) trend='<span class="tu">▲ '+diff+'%</span>';
      else if(diff<-1) trend='<span class="td2">▼ '+Math.abs(diff)+'%</span>';
      else trend='<span class="tf">→ ทรงตัว</span>';
    }
    return {p:p,gg:v.gg,hz:v.hz,sch:v.sch.size,c:cVal,cf:r1(avg(v.cf)),cfr:r1(avg(v.cfr)),dg:r1(avg(v.dg)),sv:r1(avg(v.sv)),trend:trend};
  }).sort(function(a,b){return b.c-a.c;});
  document.getElementById('tcnt').textContent=rows.length+' จังหวัด';
  document.getElementById('tbody').innerHTML=rows.map(function(row,i){
    return '<tr><td>'+(i+1)+'</td><td><b>'+row.p+'</b></td>'+
      '<td><span class="pill py">เขต '+row.hz+'</span></td>'+
      '<td><span class="pill pb">กก.'+row.gg+'</span></td>'+
      '<td>'+row.sch+'</td>'+
      '<td>'+caTag(row.c)+'</td>'+
      '<td>'+row.cf+'%</td><td>'+row.cfr+'%</td><td>'+row.dg+'%</td><td>'+row.sv+'%</td>'+
      '<td>'+row.trend+'</td></tr>';
  }).join('');
}

// ===== HEALTH ZONE TAB =====
function renderHZTab(){
  var YEARS=[...new Set(RAW.map(function(d){return d.year;}))].sort();
  var TYPES=['Table_caries','Table_cavityfree','Table_cariesfree','Table_diagnosis','Table_service'];
  var TLAB=['ฟันผุ','ปลอดฟันผุ','ฟันปลอดโรค','วินิจฉัย','บริการ'];
  var hzS={};
  HZ_ACTIVE.forEach(function(z){
    var zd=RAW.filter(function(d){return d.hz===z;});
    hzS[z]={
      gg:       new Set(zd.map(function(d){return d.gg;})).size,
      prov:     new Set(zd.map(function(d){return d.province;})).size,
      provList: [...new Set(zd.map(function(d){return d.province;}))].sort(),
      sch:      new Set(zd.map(function(d){return d.province+'|'+d.school;})).size,
      c:   r1(avg(zd.filter(function(d){return d.type==='Table_caries';}).map(function(d){return d.pct;}))),
      cf:  r1(avg(zd.filter(function(d){return d.type==='Table_cavityfree';}).map(function(d){return d.pct;}))),
      cfr: r1(avg(zd.filter(function(d){return d.type==='Table_cariesfree';}).map(function(d){return d.pct;}))),
      dg:  r1(avg(zd.filter(function(d){return d.type==='Table_diagnosis';}).map(function(d){return d.pct;}))),
      sv:  r1(avg(zd.filter(function(d){return d.type==='Table_service';}).map(function(d){return d.pct;})))
    };
  });

  document.getElementById('hzcards').innerHTML=HZ_ACTIVE.map(function(z){
    return '<div class="zcard">'+
      '<div style="position:absolute;top:0;left:0;right:0;height:4px;border-radius:13px 13px 0 0;background:linear-gradient(90deg,'+HZ_GD[z]+')"></div>'+
      '<div class="ztitle">เขตสุขภาพ '+z+'</div>'+
      '<div class="zrow"><span style="color:var(--text2)">จังหวัด ตชด.</span><span class="zv">'+hzS[z].prov+' จว.</span></div>'+
      '<div class="zrow"><span style="color:var(--text2)">กก.ตชด.</span><span class="zv">'+hzS[z].gg+' กก.</span></div>'+
      '<div class="zrow"><span style="color:var(--text2)">โรงเรียน</span><span class="zv">'+hzS[z].sch+' รร.</span></div>'+
      '<div class="zrow"><span style="color:var(--text2)">ฟันผุ</span><span class="zv" style="color:#e06080">'+hzS[z].c+'%</span></div>'+
      '<div class="zrow"><span style="color:var(--text2)">ปลอดฟันผุ</span><span class="zv" style="color:#40a070">'+hzS[z].cf+'%</span></div>'+
      '</div>';
  }).join('');

  // All indicators grouped bar
  mk('ch-hz-all',{
    type:'bar',
    data:{
      labels:TLAB,
      datasets:HZ_ACTIVE.map(function(z){
        return {
          label:'เขต '+z,
          data:TYPES.map(function(t){
            return r1(avg(RAW.filter(function(d){return d.hz===z&&d.type===t;}).map(function(d){return d.pct;})));
          }),
          backgroundColor:HZ_BG[z],
          borderColor:HZ_BD[z],
          borderWidth:1.5,
          borderRadius:5
        };
      })
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:F,boxWidth:12}}},scales:{y:{beginAtZero:true,max:100,grid:{color:'#EDE9F7'},ticks:{font:F,callback:function(v){return v+'%';}}},x:{grid:{display:false},ticks:{font:F}}}}
  });

  // Caries trend
  mk('ch-hz-trend',{
    type:'line',
    data:{
      labels:YEARS.map(function(y){return 'ปี '+y;}),
      datasets:HZ_ACTIVE.map(function(z){
        return {
          label:'เขต '+z,
          data:YEARS.map(function(y){
            var v=RAW.filter(function(d){return d.hz===z&&d.type==='Table_caries'&&d.year===y;}).map(function(d){return d.pct;});
            return v.length?r1(avg(v)):null;
          }),
          borderColor:HZ_BD[z],
          backgroundColor:'transparent',
          fill:false,tension:.4,pointRadius:5,pointBackgroundColor:HZ_BD[z]
        };
      })
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:F,boxWidth:12}}},scales:{y:{beginAtZero:true,grid:{color:'#EDE9F7'},ticks:{font:F,callback:function(v){return v+'%';}}},x:{grid:{display:false},ticks:{font:F}}}}
  });

  // Bubble
  var bubPts=HZ_ACTIVE.map(function(z,i){
    return {x:hzS[z].c,y:i+1,r:Math.max(8,Math.sqrt(hzS[z].sch)*2.5),z:z,sch:hzS[z].sch};
  });
  mk('ch-hz-bubble',{
    type:'bubble',
    data:{datasets:[{
      label:'เขตสุขภาพ',
      data:bubPts.map(function(p){return {x:p.x,y:p.y,r:p.r,z:p.z,sch:p.sch};}),
      backgroundColor:bubPts.map(function(p){return HZ_BG[p.z];}),
      borderColor:bubPts.map(function(p){return HZ_BD[p.z];}),
      borderWidth:1.5
    }]},
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{
        legend:{display:false},
        tooltip:{callbacks:{label:function(c){return 'เขต '+c.raw.z+' ฟันผุ:'+c.raw.x+'% '+c.raw.sch+' รร.';}}}
      },
      scales:{
        x:{title:{display:true,text:'ฟันผุ (%)',font:F},grid:{color:'#EDE9F7'},ticks:{font:F}},
        y:{ticks:{font:{family:F.family,size:10},callback:function(v,i){return i<HZ_ACTIVE.length?'เขต '+HZ_ACTIVE[i]:'';},stepSize:1},grid:{color:'#EDE9F7'}}
      }
    }
  });

  document.getElementById('hztbody').innerHTML=HZ_ACTIVE.map(function(z){
    return '<tr>'+
      '<td><b>เขต '+z+'</b><br><small style="color:var(--text2)">'+hzS[z].provList.join(', ')+'</small></td>'+
      '<td>'+hzS[z].gg+'</td><td>'+hzS[z].prov+'</td><td>'+hzS[z].sch+'</td>'+
      '<td>'+caTag(hzS[z].c)+'</td><td>'+hzS[z].cf+'%</td>'+
      '<td>'+hzS[z].cfr+'%</td><td>'+hzS[z].dg+'%</td><td>'+hzS[z].sv+'%</td>'+
      '</tr>';
  }).join('');
}

// ===== BPP ZONE TAB =====
function renderBPPTab(){
  var ZONES=[1,2,3,4];
  var YEARS=[...new Set(RAW.map(function(d){return d.year;}))].sort();
  var TYPES=['Table_caries','Table_cavityfree','Table_cariesfree','Table_diagnosis','Table_service'];
  var TLAB=['ฟันผุ','ปลอดฟันผุ','ฟันปลอดโรค','วินิจฉัย','บริการ'];
  var zS={};
  ZONES.forEach(function(z){
    var zd=RAW.filter(function(d){return d.bppZone===z;});
    zS[z]={
      gg:  new Set(zd.map(function(d){return d.gg;})).size,
      prov:new Set(zd.map(function(d){return d.province;})).size,
      sch: new Set(zd.map(function(d){return d.province+'|'+d.school;})).size,
      c:   r1(avg(zd.filter(function(d){return d.type==='Table_caries';}).map(function(d){return d.pct;}))),
      cf:  r1(avg(zd.filter(function(d){return d.type==='Table_cavityfree';}).map(function(d){return d.pct;}))),
      cfr: r1(avg(zd.filter(function(d){return d.type==='Table_cariesfree';}).map(function(d){return d.pct;}))),
      dg:  r1(avg(zd.filter(function(d){return d.type==='Table_diagnosis';}).map(function(d){return d.pct;}))),
      sv:  r1(avg(zd.filter(function(d){return d.type==='Table_service';}).map(function(d){return d.pct;})))
    };
  });

  mk('ch-bpp-all',{
    type:'bar',
    data:{
      labels:TLAB,
      datasets:ZONES.map(function(z,i){
        return {
          label:BPP_Z[z],
          data:TYPES.map(function(t){
            return r1(avg(RAW.filter(function(d){return d.bppZone===z&&d.type===t;}).map(function(d){return d.pct;})));
          }),
          backgroundColor:BPP_BG[i],
          borderColor:BPP_BD2[i],
          borderWidth:1.5,borderRadius:5
        };
      })
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:F,boxWidth:12}}},scales:{y:{beginAtZero:true,max:100,grid:{color:'#EDE9F7'},ticks:{font:F,callback:function(v){return v+'%';}}},x:{grid:{display:false},ticks:{font:F}}}}
  });

  mk('ch-bpp-trend',{
    type:'line',
    data:{
      labels:YEARS.map(function(y){return 'ปี '+y;}),
      datasets:ZONES.map(function(z,i){
        return {
          label:BPP_Z[z],
          data:YEARS.map(function(y){
            var v=RAW.filter(function(d){return d.bppZone===z&&d.type==='Table_caries'&&d.year===y;}).map(function(d){return d.pct;});
            return v.length?r1(avg(v)):null;
          }),
          borderColor:BPP_BD2[i],
          backgroundColor:'transparent',
          fill:false,tension:.4,pointRadius:5,pointBackgroundColor:BPP_BD2[i]
        };
      })
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:F,boxWidth:12}}},scales:{y:{beginAtZero:true,grid:{color:'#EDE9F7'},ticks:{font:F,callback:function(v){return v+'%';}}},x:{grid:{display:false},ticks:{font:F}}}}
  });

  mk('ch-bpp-gg',{
    type:'bar',
    data:{
      labels:ZONES.map(function(z){return BPP_Z[z];}),
      datasets:[{
        label:'จำนวน กก.',
        data:ZONES.map(function(z){
          return new Set(RAW.filter(function(d){return d.bppZone===z;}).map(function(d){return d.gg;})).size;
        }),
        backgroundColor:BPP_BG,borderColor:BPP_BD2,borderWidth:1.5,borderRadius:8
      }]
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{font:F,stepSize:1},grid:{color:'#EDE9F7'}},x:{grid:{display:false},ticks:{font:{family:F.family,size:11}}}}}
  });

  document.getElementById('bpptbody').innerHTML=ZONES.map(function(z){
    return '<tr>'+
      '<td><b>'+BPP_Z[z]+'</b></td>'+
      '<td>'+zS[z].gg+'</td><td>'+zS[z].prov+'</td><td>'+zS[z].sch+'</td>'+
      '<td>'+caTag(zS[z].c)+'</td><td>'+zS[z].cf+'%</td>'+
      '<td>'+zS[z].cfr+'%</td><td>'+zS[z].dg+'%</td><td>'+zS[z].sv+'%</td>'+
      '</tr>';
  }).join('');
}

// ===== COMPARE TAB =====
function onModeChange(){cmpSel=[];renderPills();renderCmpTab();}
function clearCmp(){cmpSel=[];renderPills();renderCmpTab();}

function openModal(){
  var mode=document.getElementById('cmp-mode').value;
  var opts=[],title='';
  if(mode==='year'){
    title='เลือกปี';
    opts=[...new Set(RAW.map(function(d){return d.year;}))].sort().map(function(v){return {val:String(v),label:'ปี '+v};});
  }else if(mode==='province'){
    title='เลือกจังหวัด';
    opts=[...new Set(RAW.map(function(d){return d.province;}))].sort().map(function(v){return {val:v,label:v};});
  }else if(mode==='hz'){
    title='เลือกเขตสุขภาพ';
    opts=HZ_ACTIVE.map(function(v){return {val:String(v),label:'เขตสุขภาพ '+v};});
  }else{
    title='เลือก กก.ตชด.';
    opts=[...new Set(RAW.map(function(d){return d.gg;}))].sort(function(a,b){return a-b;}).map(function(v){return {val:String(v),label:'กก. '+v};});
  }
  document.getElementById('mtitle').textContent=title;
  mTmp=[...cmpSel];
  document.getElementById('mopts').innerHTML=opts.map(function(o){
    return '<div class="mopt '+(cmpSel.indexOf(o.val)>=0?'sel':'')+'" onclick="toggleOpt(this,\''+o.val+'\')">'+o.label+'</div>';
  }).join('');
  document.getElementById('mbg').classList.add('open');
}

function toggleOpt(el,val){
  var idx=mTmp.indexOf(val);
  if(idx>=0){mTmp.splice(idx,1);el.classList.remove('sel');}
  else{mTmp.push(val);el.classList.add('sel');}
}
function closeModal(){document.getElementById('mbg').classList.remove('open');}
function applyModal(){cmpSel=mTmp;closeModal();renderPills();renderCmpTab();}

function getLabel(sel){
  var mode=document.getElementById('cmp-mode').value;
  if(mode==='year') return 'ปี '+sel;
  if(mode==='hz') return 'เขต '+sel;
  if(mode==='gg') return 'กก.'+sel;
  return sel;
}
function renderPills(){
  document.getElementById('cpills').innerHTML=cmpSel.map(function(v){
    return '<div class="cpill"><span>'+getLabel(v)+'</span><span class="rm" onclick="rmSel(\''+v+'\')">×</span></div>';
  }).join('');
}
function rmSel(val){cmpSel=cmpSel.filter(function(v){return v!==val;});renderPills();renderCmpTab();}

function renderCmpTab(){
  var mode=document.getElementById('cmp-mode').value;
  var type=document.getElementById('cmp-type').value;
  var typeNames={'Table_caries':'ฟันผุ','Table_cavityfree':'ปลอดฟันผุ','Table_cariesfree':'ฟันปลอดโรค','Table_diagnosis':'การวินิจฉัย','Table_service':'การให้บริการ'};
  var typeName=typeNames[type]||type;
  var YEARS=[...new Set(RAW.map(function(d){return d.year;}))].sort();
  var TYPES5=['Table_caries','Table_cavityfree','Table_cariesfree','Table_diagnosis','Table_service'];
  var TLAB5=['ฟันผุ','ปลอดฟันผุ','ฟันปลอดโรค','วินิจฉัย','บริการ'];

  if(!cmpSel.length){
    document.getElementById('cmp-content').innerHTML='<div class="empty"><div class="ei">⚖️</div>กด <b>"+ เพิ่ม"</b> เพื่อเลือกรายการที่ต้องการเปรียบเทียบ</div>';
    return;
  }

  function fFor(sel,t){
    if(mode==='year') return RAW.filter(function(d){return String(d.year)===sel&&d.type===t;});
    if(mode==='province') return RAW.filter(function(d){return d.province===sel&&d.type===t;});
    if(mode==='hz') return RAW.filter(function(d){return String(d.hz)===sel&&d.type===t;});
    return RAW.filter(function(d){return String(d.gg)===sel&&d.type===t;});
  }
  function fAll(sel){
    if(mode==='year') return RAW.filter(function(d){return String(d.year)===sel;});
    if(mode==='province') return RAW.filter(function(d){return d.province===sel;});
    if(mode==='hz') return RAW.filter(function(d){return String(d.hz)===sel;});
    return RAW.filter(function(d){return String(d.gg)===sel;});
  }

  document.getElementById('cmp-content').innerHTML=
    '<div style="font-family:\'Prompt\',sans-serif;font-size:15px;font-weight:700;margin-bottom:14px;">⚖️ เปรียบเทียบ: '+typeName+'</div>'+
    '<div class="cgrid">'+
      '<div class="ccard"><div class="chdr"><div class="ctitle">ค่าเฉลี่ยรวม: '+typeName+'</div><span class="cbadge bl">'+cmpSel.length+' รายการ</span></div><div class="cw"><canvas id="cmp-bar"></canvas></div></div>'+
      '<div class="ccard"><div class="chdr"><div class="ctitle">แนวโน้มรายปี: '+typeName+'</div><span class="cbadge bo">Trend</span></div><div class="cw"><canvas id="cmp-line"></canvas></div></div>'+
    '</div>'+
    '<div class="ccard" style="margin-bottom:16px"><div class="chdr"><div class="ctitle">เปรียบเทียบทุกตัวชี้วัด</div><span class="cbadge bm">All</span></div><div class="cw t"><canvas id="cmp-multi"></canvas></div></div>'+
    '<div class="tcard"><div class="thdr"><div class="ttitle">ตารางสรุปเปรียบเทียบ</div></div><div class="tscroll">'+
      '<table><thead><tr><th>รายการ</th>'+TLAB5.map(function(l){return '<th>'+l+'%</th>';}).join('')+'</tr></thead>'+
      '<tbody>'+cmpSel.map(function(sel){
        var d=fAll(sel);
        return '<tr><td><b>'+getLabel(sel)+'</b></td>'+
          TYPES5.map(function(t){return '<td>'+r1(avg(d.filter(function(x){return x.type===t;}).map(function(x){return x.pct;})))+'%</td>';}).join('')+
          '</tr>';
      }).join('')+
      '</tbody></table></div></div>';

  setTimeout(function(){
    mk('cmp-bar',{
      type:'bar',
      data:{
        labels:cmpSel.map(getLabel),
        datasets:[{
          label:typeName,
          data:cmpSel.map(function(sel){return r1(avg(fFor(sel,type).map(function(d){return d.pct;})));}),
          backgroundColor:cmpSel.map(function(_,i){return PAL[i%10];}),
          borderColor:cmpSel.map(function(_,i){return PAL_BD[i%10];}),
          borderWidth:1.5,borderRadius:8,borderSkipped:false
        }]
      },
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:'#EDE9F7'},ticks:{font:F,callback:function(v){return v+'%';}}},x:{grid:{display:false},ticks:{font:{family:F.family,size:11}}}}}
    });

    mk('cmp-line',{
      type:'line',
      data:{
        labels:YEARS.map(function(y){return 'ปี '+y;}),
        datasets:cmpSel.map(function(sel,i){
          return {
            label:getLabel(sel),
            data:YEARS.map(function(y){
              var sub;
              if(mode==='year') sub=RAW.filter(function(d){return String(d.year)===sel&&d.type===type&&d.year===y;});
              else if(mode==='province') sub=RAW.filter(function(d){return d.province===sel&&d.type===type&&d.year===y;});
              else if(mode==='hz') sub=RAW.filter(function(d){return String(d.hz)===sel&&d.type===type&&d.year===y;});
              else sub=RAW.filter(function(d){return String(d.gg)===sel&&d.type===type&&d.year===y;});
              return sub.length?r1(avg(sub.map(function(d){return d.pct;}))):null;
            }),
            borderColor:PAL_BD[i%10],backgroundColor:'transparent',
            fill:false,tension:.4,pointRadius:6,pointBackgroundColor:PAL_BD[i%10]
          };
        })
      },
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:F,boxWidth:12}}},scales:{y:{beginAtZero:true,grid:{color:'#EDE9F7'},ticks:{font:F,callback:function(v){return v+'%';}}},x:{grid:{display:false},ticks:{font:F}}}}
    });

    mk('cmp-multi',{
      type:'bar',
      data:{
        labels:TLAB5,
        datasets:cmpSel.map(function(sel,i){
          return {
            label:getLabel(sel),
            data:TYPES5.map(function(t){
              return r1(avg(fAll(sel).filter(function(d){return d.type===t;}).map(function(d){return d.pct;})));
            }),
            backgroundColor:PAL[i%10],borderColor:PAL_BD[i%10],borderWidth:1.5,borderRadius:5
          };
        })
      },
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:F,boxWidth:12}}},scales:{y:{beginAtZero:true,max:100,grid:{color:'#EDE9F7'},ticks:{font:F,callback:function(v){return v+'%';}}},x:{grid:{display:false},ticks:{font:F}}}}
    });
  },50);
}

// START — รอ DOM พร้อมก่อนทำงาน
document.addEventListener('DOMContentLoaded', function(){
  // ไม่แสดง loading overlay — โหลด data.json ใน background ทันที
  setLoad(false);
  fetchAndRender();
  scheduleAutoRefresh();
});
