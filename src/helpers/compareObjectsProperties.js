// Compare if 2 objects have the same structure

export default function compareObjectsProperties(obj1, obj2) {
  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if every key in obj1 exists in obj2
  // If the keys exist in both, then check to see if they are objects. If they are, then recursively call the function again.
  for (const key of keys1) {
    if (!Object.hasOwn(obj2, key)) {
      return false;
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (compareObjectsProperties(obj1[key], obj2[key]) === false) {
        return false;
      }
    } else if ((typeof obj1[key] === 'object' && typeof obj2[key] !== 'object') || (typeof obj1[key] !== 'object' && typeof obj2[key] === 'object')) {
      return false;
    }
  }

  return true;
}
