export const storeData = (data) => ({
    type: "SAVE_DATA",
    payload: { data },
  });

export const filterData = (data) => ({
    type: "FILTER_DATA",
    payload: { data },
  });