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
function openDepartment(key){
  const d=departments[key];
  panel.querySelector("#panelIcon").textContent=d.icon;
  panel.querySelector("#panelEn").textContent=d.en;
  panel.querySelector("#panelTitle").textContent=d.title;
  panel.querySelector("#panelDesc").textContent=d.desc;
  panel.querySelector("#taskCount").textContent=d.tasks;
  panel.querySelector("#agentCount").textContent=d.agents.length;
  panel.querySelector("#agents").innerHTML=d.agents.map((a,i)=>`<div class="agent"><span class="agent-avatar">${["🤖","🧠","✨"][i]}</span><span><b>${a.split(" — ")[0]}</b><small>${a.split(" — ")[1]}</small></span><i class="online"></i></div>`).join("");
  panel.classList.add("open");scrim.classList.add("show");panel.setAttribute("aria-hidden","false");
}
function closePanel(){panel.classList.remove("open");scrim.classList.remove("show");panel.setAttribute("aria-hidden","true")}
document.querySelectorAll(".department").forEach(b=>b.addEventListener("click",()=>openDepartment(b.dataset.dept)));
document.querySelector("#closePanel").addEventListener("click",closePanel);
scrim.addEventListener("click",closePanel);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closePanel()});

const routes=[
  [[50,50],[38,38],[25,23]],[[50,50],[61,37],[68,22]],[[50,50],[34,54],[15,49]],
  [[50,50],[68,55],[86,48]],[[50,50],[42,64],[30,76]],[[50,50],[58,66],[72,76]],
  [[25,23],[42,35],[50,50],[68,55],[72,76]]
];
const shirts=["#ef7654","#3f8ca6","#e6b84f","#6d9d64","#8c74aa","#e79245"];
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

let zoom=1;const world=document.querySelector("#world");
function applyZoom(){world.style.transform=`translate(-50%,-50%) scale(${zoom})`}
document.querySelector("#zoomIn").addEventListener("click",()=>{zoom=Math.min(1.35,zoom+.1);applyZoom()});
document.querySelector("#zoomOut").addEventListener("click",()=>{zoom=Math.max(1,zoom-.1);applyZoom()});
document.querySelector("#startTask").addEventListener("click",()=>{
  const toast=document.querySelector("#toast");toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200);
});
setInterval(()=>{document.querySelector("#clock").textContent=new Date().toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})},1000);
