export const validateAge = (age) => {
  if (parseInt(age) <= 18) {
    console.log("Age error");
    return false;
  }
  return true;
};


export const validateQuantity = (qty) => {
  if(parseInt(qty) < 0){
    console.log("Quantity error")
    return false;
  }
  return true;
}
