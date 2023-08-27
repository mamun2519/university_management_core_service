export const asyncForeach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Excepted an array');
  }
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
};
