const API_BASE = "https://cambo-gazetteer.manethpak.dev/api/v1";
const PROXY_BASE = "https://api.codetabs.com/v1/proxy/?quest=";

const provinceSelect = document.getElementById("province-select");
const districtSelect = document.getElementById("district-select");
const communeSelect = document.getElementById("commune-select");
const villageSelect = document.getElementById("village-select");

async function fetchData(endpoint) {
  try {
    const targetUrl = `${API_BASE}${endpoint}`;
    const response = await fetch(
      `${PROXY_BASE}${encodeURIComponent(targetUrl)}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : (data?.data ?? []);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function populateProvinces() {
  const provinces = await fetchData("/provinces");
  provinceSelect.innerHTML = '<option value="">Select Province</option>';
  provinces.forEach((province) => {
    const option = document.createElement("option");
    option.value = province.code ?? province.id ?? "";
    option.textContent =
      province.name_en ?? province.name_km ?? province.name ?? "";
    provinceSelect.appendChild(option);
  });
}

async function populateDistricts(provinceId) {
  const districts = await fetchData(`/districts?province=${provinceId}`);
  districtSelect.innerHTML = '<option value="">Select District</option>';
  districts.forEach((district) => {
    const option = document.createElement("option");
    option.value = district.code ?? district.id ?? "";
    option.textContent =
      district.name_en ?? district.name_km ?? district.name ?? "";
    districtSelect.appendChild(option);
  });
}

async function populateCommunes(districtId) {
  const communes = await fetchData(`/communes?district=${districtId}`);
  communeSelect.innerHTML = '<option value="">Select Commune</option>';
  communes.forEach((commune) => {
    const option = document.createElement("option");
    option.value = commune.code ?? commune.id ?? "";
    option.textContent =
      commune.name_en ?? commune.name_km ?? commune.name ?? "";
    communeSelect.appendChild(option);
  });
}

async function populateVillages(communeId) {
  const villages = await fetchData(`/villages?commune=${communeId}`);
  villageSelect.innerHTML = '<option value="">Select Village</option>';
  villages.forEach((village) => {
    const option = document.createElement("option");
    option.value = village.code ?? village.id ?? "";
    option.textContent =
      village.name_en ?? village.name_km ?? village.name ?? "";
    villageSelect.appendChild(option);
  });
}

provinceSelect.addEventListener("change", () => {
  const provinceId = provinceSelect.value;
  if (provinceId) {
    populateDistricts(provinceId);
    districtSelect.disabled = false;
  } else {
    districtSelect.innerHTML = '<option value="">Select District</option>';
    communeSelect.innerHTML = '<option value="">Select Commune</option>';
    villageSelect.innerHTML = '<option value="">Select Village</option>';
    districtSelect.disabled = true;
    communeSelect.disabled = true;
    villageSelect.disabled = true;
  }
});

districtSelect.addEventListener("change", () => {
  const districtId = districtSelect.value;
  if (districtId) {
    populateCommunes(districtId);
    communeSelect.disabled = false;
  } else {
    communeSelect.innerHTML = '<option value="">Select Commune</option>';
    villageSelect.innerHTML = '<option value="">Select Village</option>';
    communeSelect.disabled = true;
    villageSelect.disabled = true;
  }
});

communeSelect.addEventListener("change", () => {
  const communeId = communeSelect.value;
  if (communeId) {
    populateVillages(communeId);
    villageSelect.disabled = false;
  } else {
    villageSelect.innerHTML = '<option value="">Select Village</option>';
    villageSelect.disabled = true;
  }
});

populateProvinces();
