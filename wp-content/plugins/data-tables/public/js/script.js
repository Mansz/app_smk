jQuery(document).ready(function ($) {
  const tables = document.querySelectorAll(".dtbl-table");

  Object.values(tables).map((item) => {
    const options = JSON.parse(item.dataset.options || "{}");
    item.removeAttribute("data-options");
    jQuery(item).DataTable(options);
  });
});
