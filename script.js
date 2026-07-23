const departments = {
  content:{icon:"🎬",en:"CONTENT STUDIO",title:"สตูดิโอคอนเทนต์",desc:"สร้างโพสต์ บทความ วิดีโอ และภาพสำหรับทุกช่องทาง",tasks:12,agents:["มิวส์ — นักเขียนคอนเทนต์","เฟรม — ผู้กำกับวิดีโอ","พิกเซล — นักออกแบบภาพ"]},
  marketing:{icon:"📣",en:"MARKETING LAB",title:"แผนกการตลาด",desc:"วางแผนแคมเปญ วิเคราะห์กลุ่มเป้าหมาย และขยายการเข้าถึง",tasks:9,agents:["สปาร์ก — นักวางแผนแคมเปญ","เทรนด์ — นักวิเคราะห์ตลาด","รีช — ผู้เชี่ยวชาญโฆษณา"]},
  automation:{icon:"⚙️",en:"AUTOMATION WORKS",title:"โรงงานระบบอัตโนมัติ",desc:"เชื่อมระบบและสร้างเวิร์กโฟลว์ให้ธุรกิจทำงานได้ตลอด 24 ชั่วโมง",tasks:7,agents:["โฟลว์ — วิศวกรเวิร์กโฟลว์","ลิงก์ — นักเชื่อมระบบ","บอตตี้ — ผู้ช่วยอัตโนมัติ"]},
  sales:{icon:"🛍️",en:"SALES GUILD",title:"สมาคมฝ่ายขาย",desc:"ค้นหาลูกค้า ติดตามโอกาส และจัดทำข้อเสนอที่เหมาะกับแต่ละราย",tasks:15,agents:["ลีด — นักหาลูกค้า","โคลส — ผู้ช่วยปิดการขาย","ดีล — ผู้จัดทำข้อเสนอ"]},
  data:{icon:"📊",en:"DATA LAB",title:"ศูนย์ข้อมูล",desc:"เปลี่ยนข้อมูลธุรกิจเป็นรายงาน แนวโน้ม และคำแนะนำที่นำไปใช้ได้",tasks:5,agents:["อินไซต์ — นักวิเคราะห์ข้อมูล","ชาร์ต — ผู้สร้างรายงาน","ฟอร์แคสต์ — นักพยากรณ์"]},
  care:{icon:"💬",en:"CUSTOMER CARE",title:"ศูนย์ดูแลลูกค้า",desc:"ตอบคำถาม คัดแยกปัญหา และดูแลลูกค้าทุกช่องทางอย่างใส่ใจ",tasks:18,agents:["แคร์ — เจ้าหน้าที่บริการ","โซลฟ์ — ผู้แก้ปัญหา","วอยซ์ — ผู้ดูแลเสียงลูกค้า"]},
  core:{icon:"✨",en:"AI COMMAND CENTER",title:"ศูนย์บัญชาการ AI",desc:"ภาพรวมการทำงานและการประสานงานของทุกทีมในเมือง",tasks:66,agents:["ออเคสตรา — ผู้ประสานงานกลาง","การ์ด — ผู้ตรวจสอบคุณภาพ","ไพล็อต — ผู้จัดลำดับงาน"]}
};

const panel=document.querySelector("#panel"),scrim=document.querySelector("#scrim");
const storageKey="ai-city-departments-v1";
departments.care.icon="📱";
departments.care.en="DEVICE MONITOR";
departments.care.title="ตรวจสอบอุปกรณ์";
departments.care.desc="ตรวจสอบสถานะอุปกรณ์ iOS การเชื่อมต่อ และความพร้อมใช้งานจากศูนย์กลาง";
departments.sales.url="https://omnichannel-chat-app.onrender.com/";
departments.data.url="https://it-monthly-dashboard.onrender.com/";
departments.care.url="https://ios-device-monitor-46w9.onrender.com/";
Object.keys(departments).forEach(key=>{if(typeof departments[key].url==="undefined")departments[key].url=""});
const defaults=JSON.parse(JSON.stringify(departments));
let currentDepartment="";
try{
  const saved=JSON.parse(localStorage.getItem(storageKey)||"{}");
  Object.keys(saved).forEach(key=>{if(departments[key])Object.assign(departments[key],saved[key])});
  if(saved.care?.title==="ศูนย์ดูแลลูกค้า"){
    departments.care.icon="📱";
    departments.care.en="DEVICE MONITOR";
    departments.care.title="ตรวจสอบอุปกรณ์";
    departments.care.desc="ตรวจสอบสถานะอุปกรณ์ iOS การเชื่อมต่อ และความพร้อมใช้งานจากศูนย์กลาง";
  }
}catch(error){console.warn("Saved department data could not be loaded",error)}

function departmentButton(key){return document.querySelector(`.department[data-dept="${key}"]`)}
function syncMapLabel(key){
  const button=departmentButton(key);
  if(button)button.querySelector(".dept-label b").textContent=departments[key].title;
}
Object.keys(departments).forEach(key=>syncMapLabel(key));

function openDepartment(key){
  currentDepartment=key;
  panel.classList.remove("system-view");
  panel.querySelector("#systemContent").innerHTML="";
  const d=departments[key];
  const button=departmentButton(key);
  if(typeof d.url==="undefined")d.url=button?.dataset.url||"";
  panel.querySelector("#panelIcon").textContent=d.icon;
  panel.querySelector("#panelEn").textContent=d.en;
  panel.querySelector("#panelTitle").textContent=d.title;
  panel.querySelector("#panelDesc").textContent=d.desc;
  panel.querySelector("#taskCount").textContent=d.tasks;
  panel.querySelector("#agentCount").textContent=d.agents.length;
  panel.querySelector("#agents").innerHTML=d.agents.map((a,i)=>`<div class="agent"><span class="agent-avatar">${["🤖","🧠","✨"][i]}</span><span><b>${a.split(" — ")[0]}</b><small>${a.split(" — ")[1]||""}</small></span><i class="online"></i></div>`).join("");
  panel.querySelector("#panelLink").value=d.url||"";
  const openApp=panel.querySelector("#openApp");
  openApp.href=d.url||"#";
  openApp.classList.toggle("hidden",!d.url);
  setEditing(false);
  panel.classList.add("open");scrim.classList.add("show");panel.setAttribute("aria-hidden","false");
}
function setEditing(enabled){
  panel.classList.toggle("editing",enabled);
  ["panelEn","panelTitle","panelDesc","taskCount"].forEach(id=>{
    panel.querySelector(`#${id}`).contentEditable=enabled?"true":"false";
  });
  panel.querySelectorAll(".agent b,.agent small").forEach(el=>el.contentEditable=enabled?"true":"false");
  panel.querySelector("#editPanel").textContent=enabled?"✕ ยกเลิก":"✎ แก้ไข";
}
function saveDepartment(){
  if(!currentDepartment)return;
  const d=departments[currentDepartment];
  d.en=panel.querySelector("#panelEn").textContent.trim();
  d.title=panel.querySelector("#panelTitle").textContent.trim();
  d.desc=panel.querySelector("#panelDesc").textContent.trim();
  d.tasks=Math.max(0,Number.parseInt(panel.querySelector("#taskCount").textContent,10)||0);
  d.url=panel.querySelector("#panelLink").value.trim();
  d.agents=[...panel.querySelectorAll(".agent")].map(agent=>{
    const name=agent.querySelector("b").textContent.trim();
    const role=agent.querySelector("small").textContent.trim();
    return `${name} — ${role}`;
  });
  const button=departmentButton(currentDepartment);
  if(button){
    if(d.url)button.dataset.url=d.url;
    else delete button.dataset.url;
  }
  localStorage.setItem(storageKey,JSON.stringify(departments));
  syncMapLabel(currentDepartment);
  openDepartment(currentDepartment);
  showToast("บันทึกการแก้ไขแล้ว ✓");
}
function resetDepartment(){
  if(!currentDepartment)return;
  departments[currentDepartment]=JSON.parse(JSON.stringify(defaults[currentDepartment]));
  const saved=JSON.parse(localStorage.getItem(storageKey)||"{}");
  delete saved[currentDepartment];
  localStorage.setItem(storageKey,JSON.stringify(saved));
  syncMapLabel(currentDepartment);
  openDepartment(currentDepartment);
  showToast("คืนค่าเริ่มต้นแล้ว");
}
function showToast(message){
  const toast=document.querySelector("#toast");
  toast.textContent=message;toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2200);
}
function closePanel(){setEditing(false);panel.classList.remove("open");scrim.classList.remove("show");panel.setAttribute("aria-hidden","true")}
document.querySelector("#editPanel").addEventListener("click",()=>setEditing(!panel.classList.contains("editing")));
document.querySelector("#savePanel").addEventListener("click",saveDepartment);
document.querySelector("#resetPanel").addEventListener("click",resetDepartment);
document.querySelectorAll(".department").forEach(b=>b.addEventListener("click",()=>openDepartment(b.dataset.dept)));
function openSystemView(view){
  currentDepartment="";
  setEditing(false);
  panel.classList.add("system-view","open");
  scrim.classList.add("show");
  panel.setAttribute("aria-hidden","false");
  const content=panel.querySelector("#systemContent");
  if(view==="tasks"){
    panel.querySelector("#panelIcon").textContent="📋";
    panel.querySelector("#panelEn").textContent="TASK CENTER";
    panel.querySelector("#panelTitle").textContent="งานทั้งหมด";
    panel.querySelector("#panelDesc").textContent="ติดตามงานจากทุกแผนกในเมือง";
    content.innerHTML=`<div class="summary-list">
      <article class="summary-card"><header><b>สรุปรายงานยอดขายประจำวัน</b><span class="status-pill">กำลังทำ</span></header><small>ฝ่ายขาย · อัปเดต 5 นาทีที่แล้ว</small><div class="progress-bar"><i style="width:78%"></i></div></article>
      <article class="summary-card"><header><b>ตรวจสอบอุปกรณ์ iOS</b><span class="status-pill">เสร็จแล้ว</span></header><small>ตรวจสอบอุปกรณ์ · 24 เครื่องออนไลน์</small><div class="progress-bar"><i style="width:100%"></i></div></article>
      <article class="summary-card"><header><b>วิเคราะห์ข้อมูลรายเดือน</b><span class="status-pill waiting">รอตรวจ</span></header><small>ศูนย์ข้อมูล · ส่งผลลัพธ์แล้ว</small><div class="progress-bar"><i style="width:92%"></i></div></article>
      <article class="summary-card"><header><b>วางแผนคอนเทนต์สัปดาห์หน้า</b><span class="status-pill">กำลังทำ</span></header><small>สตูดิโอคอนเทนต์ · 4 จาก 6 ชิ้น</small><div class="progress-bar"><i style="width:66%"></i></div></article>
    </div>`;
  }else if(view==="team"){
    panel.querySelector("#panelIcon").textContent="🤖";
    panel.querySelector("#panelEn").textContent="AI WORKFORCE";
    panel.querySelector("#panelTitle").textContent="ทีม AI ทั้งหมด";
    panel.querySelector("#panelDesc").textContent="สมาชิก AI ที่ปฏิบัติงานในทุกแผนก";
    content.innerHTML=`<div class="summary-list">${Object.values(departments).map(d=>`<article class="summary-card"><header><b>${d.icon} ${d.title}</b><span class="status-pill">${d.agents.length} AI</span></header><small>${d.agents.map(a=>a.split(" — ")[0]).join(" · ")}</small></article>`).join("")}</div>`;
  }else{
    const totalTasks=Object.values(departments).reduce((sum,d)=>sum+d.tasks,0);
    panel.querySelector("#panelIcon").textContent="📈";
    panel.querySelector("#panelEn").textContent="CITY ANALYTICS";
    panel.querySelector("#panelTitle").textContent="รายงานเมือง AI";
    panel.querySelector("#panelDesc").textContent="ภาพรวมประสิทธิภาพการทำงานวันนี้";
    content.innerHTML=`<div class="report-grid"><div class="report-card"><b>${totalTasks}</b><small>งานทั้งหมด</small></div><div class="report-card"><b>94%</b><small>สำเร็จตามเวลา</small></div><div class="report-card"><b>18</b><small>AI ออนไลน์</small></div><div class="report-card"><b>6.4 ชม.</b><small>เวลาที่ประหยัด</small></div></div><div class="summary-card"><header><b>ประสิทธิภาพรวม</b><span class="status-pill">ดีเยี่ยม</span></header><small>เพิ่มขึ้น 12% จากเมื่อวาน</small><div class="progress-bar"><i style="width:94%"></i></div></div>`;
  }
}
document.querySelectorAll(".bottom-dock button").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".bottom-dock button").forEach(item=>item.classList.remove("active"));
  button.classList.add("active");
  if(button.dataset.view==="city")closePanel();
  else openSystemView(button.dataset.view);
}));
document.querySelector("#closePanel").addEventListener("click",closePanel);
scrim.addEventListener("click",closePanel);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closePanel()});

const routes=[
  [[50,50],[38,38],[25,23]],[[50,50],[61,37],[68,22]],[[50,50],[34,54],[15,49]],
  [[50,50],[68,55],[86,48]],[[50,50],[42,64],[30,76]],[[50,50],[58,66],[72,76]],
  [[25,23],[42,35],[50,50],[68,55],[72,76]]
];
const shirts=["#ff7657","#37d5e8","#ffc84a","#65d987","#b995ff","#ff9e45"];
function spawnWalker(index){
  const el=document.createElement("div");el.className="walker";
  el.style.setProperty("--shirt",shirts[index%shirts.length]);
  el.innerHTML='<i class="head"></i><i class="body"></i><i class="legs"></i>';
  document.querySelector("#walkers").appendChild(el);
  let route=routes[index%routes.length],point=Math.floor(Math.random()*route.length);
  const move=()=>{
    const next=(point+1)%route.length,[x,y]=route[next],[cx]=route[point];
    const duration=3200+Math.random()*2600;
    el.classList.toggle("left",x<cx);el.classList.remove("paused");
    el.style.transitionDuration=`${duration}ms`;el.style.left=`${x}%`;el.style.top=`${y}%`;point=next;
    setTimeout(()=>{el.classList.add("paused");setTimeout(move,500+Math.random()*1500)},duration);
  };
  const [x,y]=route[point];el.style.left=`${x}%`;el.style.top=`${y}%`;setTimeout(move,index*380);
}
for(let i=0;i<14;i++)spawnWalker(i);

let zoom=1;const mapImage=document.querySelector(".map>img");
function applyZoom(){mapImage.style.transform=`scale(${zoom})`}
applyZoom();
document.querySelector("#zoomIn").addEventListener("click",()=>{zoom=Math.min(1.35,zoom+.05);applyZoom()});
document.querySelector("#zoomOut").addEventListener("click",()=>{zoom=Math.max(.1,zoom-.05);applyZoom()});
document.querySelector("#startTask").addEventListener("click",()=>{
  showToast("ส่งงานให้ทีม AI แล้ว ✓");
});
setInterval(()=>{document.querySelector("#clock").textContent=new Date().toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})},1000);
