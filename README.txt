SCHOOLTRACK EAPIHS — SHARED APP STARTER

Includes:
- Guest display-name entry and read-only role
- Admin display-name + private Admin Code verification
- Shared inventory list, add/edit/delete for verified admins
- Shared category choices and activity list
- Light/dark mode toggle
- Button click sounds and sound on/off setting
- Maroon and green responsive layout; installable PWA shell

IMPORTANT: This is a starter build and is NOT live until a NEW Supabase project is connected and configured. It has not yet been tested against your new project.

SETUP (do after creating the new Supabase project):
1. In public/app.js replace SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY with the new project's URL and publishable key.
2. In Supabase SQL Editor run supabase/schema.sql.
3. In Authentication > Providers enable Anonymous sign-ins.
4. Deploy supabase/functions/verify-admin-code as an Edge Function named exactly verify-admin-code.
5. In Edge Function Secrets set SCHOOLTRACK_ADMIN_CODE to your own long private code. Do NOT put this code in app.js, GitHub, or this README.
6. Ensure Supabase provides SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to the function as server-side secrets. Never share the service-role key.
7. Host the contents of public/ on GitHub Pages (HTTPS). The app files must be in the published root.
8. Test guest read access, admin verification, admin writes, guest write rejection, and sync on a second device before using it for school records.

CURRENT LIMITATIONS:
- Online shared data requires an internet connection. The PWA shell can cache, but this version does not queue offline edits.
- This first build includes core shared inventory; the extended borrow/return/repair/missing workflows, detailed reports, full transaction history, backup/restore and CSV export still need to be added and tested in the next build stage.
- Admin Code setup is intentionally done privately in Supabase, not inside the public app.
