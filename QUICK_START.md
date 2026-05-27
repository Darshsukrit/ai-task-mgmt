# 🚀 Quick Start — Production-Ready App

## Start Backend & Frontend

### Terminal 1: Backend
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8002
```
✅ Backend runs at: `http://127.0.0.1:8002`

### Terminal 2: Frontend
```bash
npm run dev
```
✅ Frontend runs at: `http://localhost:5173`

---

## Test Real-Time Data Entry

### ✅ Test 1: Create a Note
1. Open browser: `http://localhost:5173`
2. Click **"Notes"** in sidebar
3. Click **"New note"** button
4. Fill form:
   - Title: "My First Note"
   - Content: "This is real data from the database!"
   - Tags: "test, database" (optional)
5. Click **"Create Note"**
6. ✨ Note appears immediately (no page reload!)

### ✅ Test 2: Create a Goal
1. Click **"Goals"** in sidebar
2. Click **"Add goal"** button
3. Fill form:
   - Title: "Learn Production Ready Apps"
   - Category: "work"
   - Target Date: Tomorrow's date
4. Click **"Create Goal"**
5. ✨ Goal appears with progress bar

### ✅ Test 3: Create a Calendar Event
1. Click **"Calendar"** in sidebar
2. Click **"New event"** button
3. Fill form:
   - Title: "Team Standup"
   - Start Time: Today at 10:00 AM
   - End Time: Today at 11:00 AM
   - Location: "Conference Room A"
   - Color: Pick any color
   - Reminder: Enable, 15 minutes
4. Click **"Create Event"**
5. ✨ Event appears immediately (sorted by time)

### ✅ Test 4: View Dashboard
1. Click **"Dashboard"** in sidebar
2. Watch data load (should see spinner briefly)
3. Verify:
   - Stats show real task counts
   - Activity feed shows real activities
   - Insights show real data
   - All data is from your database (not mocked!)

---

## Verify Data Persistence

### Check Backend Database
```bash
# Connect to your MySQL database
mysql -u user -p database_name

# Verify tables were created
SHOW TABLES;

# Check notes you created
SELECT * FROM notes;
SELECT * FROM goals;
SELECT * FROM events;
```

---

## Common Issues & Fixes

### Issue: CORS Error
**Error**: `Access to XMLHttpRequest at 'http://127.0.0.1:8002/notes' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Fix**: CORS is already configured in `backend/app/main.py` for port 5173. If you changed ports:
```python
# In backend/app/main.py
allow_origins=[
    "http://127.0.0.1:5173",  # Change 5173 to your frontend port
    "http://localhost:5173",
],
```

### Issue: Database Connection Error
**Error**: `(pymysql.err.OperationalError) (2003, "Can't connect to MySQL server"`

**Fix**: 
1. Ensure MySQL is running
2. Check `.env` file has correct DATABASE_URL
3. Example: `DATABASE_URL=mysql+pymysql://user:password@localhost:3306/db_name`

### Issue: Form Submit Shows Error
**Check**: 
1. Browser DevTools → Network tab
2. Look at API response (should see 200 status)
3. Check backend logs for detailed error message

---

## Next: Replace Hardcoded User IDs

**Current code** (needs updating):
```javascript
const workspaceId = 1 // TODO: Get from context/auth
const userId = 1 // TODO: Get from context/auth
```

**After implementing auth:**
```javascript
const { workspaceId, userId } = useAuth() // or from context
```

This is the **only thing left** to make it fully production-ready!

---

## Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads at localhost:5173
- [ ] "New note" button opens form
- [ ] Can submit a note
- [ ] Note appears immediately
- [ ] Notes page shows real data (not mocked)
- [ ] Can create goals and events
- [ ] Dashboard shows stats from database
- [ ] No CORS errors in console
- [ ] All data persists after refresh

**If all checked: You have a fully functional production-ready app! 🎉**

---

## Files Reference

| What | Where |
|------|-------|
| API Helpers | `src/utils/api.js` |
| Modal Component | `src/components/ui/Modal.jsx` |
| Forms | `src/components/forms/*.jsx` |
| Pages | `src/pages/(Dashboard\|Notes\|Goals\|Calendar).jsx` |
| Backend Routes | `backend/app/routes/(notes\|goals\|events\|dashboard).py` |
| Database Models | `backend/app/models/(note\|goal\|event).py` |
| Full Docs | `PRODUCTION_IMPLEMENTATION_SUMMARY.md` |

---

## Questions?

Check the detailed documentation:
👉 `PRODUCTION_IMPLEMENTATION_SUMMARY.md`

All endpoints, data flows, and architecture explained there!
