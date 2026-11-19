/* Level Plain Pro — shared Supabase client for the client portal.
   Loaded after the Supabase JS CDN script on every portal page. */
(function () {
  "use strict";

  var SUPABASE_URL = "https://gsviphodcvlkbsybtztx.supabase.co";
  var SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Ziop3xdYZu3U9MpUAw1wXA_W1ocE50Z";

  window.lppSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
})();
