javascript: (function() {
    const crs = ['CA CR Alpes Provence', 'CA CR Atlantique Vendée', 'CA CR Brie Picardie', 'CA CR Centre France', 'CA CR Centre Loire', 'CA CR Centre-Est', 'CA CR Champagne-Bourgogne', 'CA CR Côtes-d\'Armor', 'CA CR de Normandie-Seine', 'CA CR Finistère', 'CA CR Franche-Comté', 'CA CR Ile de France', 'CA CR Languedoc', 'CA CR Loire Haute-Loire', 'CA CR Lorraine', 'CA CR Morbihan', 'CA CR Normandie', 'CA CR Réunion', 'CA CR Sud Rhône Alpes', 'CA CR Toulouse 31'];
    const s = document.querySelector("#bcr_d0009_rb_list_select_1").children;
    for (var i = 0, l = s.length; i < l; i++) {
        if (crs.indexOf(s[i].label) != -1) {
            s[i].label += " ✔"
        }
    }
})()
