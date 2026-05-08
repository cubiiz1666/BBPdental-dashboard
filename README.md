# 🦷 คู่มือ Deploy Dashboard สุขภาพช่องปาก ตชด.
## ออนไลน์ฟรี · URL ถาวร · ดึงข้อมูลจาก Google Sheets อัตโนมัติ

---

## ขั้นตอนที่ 1 — ตั้งค่า Google Sheet ให้อ่านได้สาธารณะ

> ⚠️ ต้องทำก่อน ไม่งั้น Dashboard ดึงข้อมูลไม่ได้

1. เปิด Google Sheet ของคุณ
2. กดปุ่ม **Share** (มุมขวาบน)
3. ตรงช่อง "General access" เปลี่ยนเป็น **"Anyone with the link"**
4. เลือกสิทธิ์เป็น **"Viewer"** (อ่านอย่างเดียว ปลอดภัย)
5. กด **Done**

✅ ตรวจสอบ: เปิด Link นี้ในหน้าต่าง incognito แล้วเห็น Sheet ได้ = ถูกต้อง

---

## ขั้นตอนที่ 2 — ตรวจสอบชื่อคอลัมน์ใน Sheet

Dashboard จะอ่านคอลัมน์เหล่านี้ (Row แรกต้องเป็น Header):

| คอลัมน์ใน Sheet | ความหมาย |
|---|---|
| `จังหวัด` | ชื่อจังหวัด |
| `โรงเรียน` | ชื่อโรงเรียน |
| `ร้อยละ` | ค่าเปอร์เซ็นต์ |
| `กก.ตชด.` | รหัสกองกำกับ |
| `รายการ` | ประเภทข้อมูล (Table_caries ฯลฯ) |
| `ปี` | ปีการศึกษา (2566, 2567 ...) |

> ถ้าชื่อคอลัมน์ต่างกัน ให้แก้ในไฟล์ `index.html` บรรทัด `const COL = {...}`

---

## ขั้นตอนที่ 3 — Deploy บน Vercel (ฟรี, ไม่จำกัดเวลา)

### 3.1 สมัคร Vercel
1. ไปที่ https://vercel.com
2. กด **Sign Up** → เลือก **Continue with GitHub**
3. สมัคร GitHub ถ้ายังไม่มี (ฟรี)

### 3.2 อัปโหลดไฟล์
1. หลัง Login Vercel → กด **"Add New Project"**
2. เลือก **"Deploy without Git"** (ล่างสุด หรือ drag & drop)
3. ลาก **โฟลเดอร์ `dental-dashboard`** ทั้งโฟลเดอร์ มาวาง
4. กด **Deploy**

### 3.3 รอ ~30 วินาที
Vercel จะให้ URL เช่น:
```
https://dental-dashboard-abc123.vercel.app
```

🎉 **เปิดได้ทุกที่ ทุกอุปกรณ์ ฟรีตลอดไป**

---

## ขั้นตอนที่ 4 — ตั้ง Custom Domain (ถ้าต้องการ)

ถ้าอยากได้ URL สวยงาม เช่น `dental.bpp.go.th`:
1. ใน Vercel → Project Settings → Domains
2. กรอก domain ที่ต้องการ
3. ไปตั้ง DNS ตามที่ Vercel แนะนำ

---

## วิธีการทำงานของ Dashboard

```
ผู้ใช้เปิด URL
      ↓
Dashboard โหลดขึ้นมา
      ↓
ดึงข้อมูลจาก Google Sheets API (gviz)
      ↓
ประมวลผลและแสดงกราฟ/ตาราง
      ↓
ทุกวัน 09:00 น. → ดึงข้อมูลใหม่อัตโนมัติ
      ↓
ถ้า Internet ขาด → ใช้ Cache จากครั้งล่าสุด
```

---

## การอัปเดตข้อมูล

| วิธี | รายละเอียด |
|---|---|
| **อัตโนมัติ** | ทุกวัน 09:00 น. (ผู้ใช้ไม่ต้องทำอะไร) |
| **Manual** | กดปุ่ม 🔄 "อัปเดตข้อมูล" มุมขวาบน |
| **แก้ข้อมูล** | แก้ใน Google Sheet ได้เลย Dashboard จะดึงครั้งถัดไป |

---

## ถ้าข้อมูลไม่แสดง — Checklist

- [ ] Google Sheet ตั้งเป็น "Anyone with the link - Viewer" แล้วหรือยัง?
- [ ] ชื่อ Sheet ตรงกับ `DATAMASTER01` ไหม?
- [ ] SHEET_ID ในไฟล์ถูกต้องไหม? (ดูจาก URL ของ Sheet)
- [ ] Row แรกเป็น Header ชื่อคอลัมน์ถูกต้องไหม?

---

## ข้อมูลสำคัญในไฟล์ index.html

```javascript
// บรรทัดที่ต้องตรวจสอบ/แก้ไขถ้าจำเป็น
const SHEET_ID   = '1utCuqqSUxPSAws16j2mdRLlGowPerRpN4tH5a5Ezeyo';
const SHEET_NAME = 'DATAMASTER01';
const COL = {
  province: 'จังหวัด',    // ← ต้องตรงกับ Header ใน Sheet
  school:   'โรงเรียน',
  pct:      'ร้อยละ',
  gg:       'กก.ตชด.',
  type:     'รายการ',
  year:     'ปี',
};
```

---

*จัดทำโดย Claude · Anthropic*
