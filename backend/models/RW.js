import project_1 from "./Schema.js";

const read = async () => {
    try {
      const pro = await project_1.find();
      console.log("readdata")
      // console.log(pro)
      return ( pro )
    } catch (error) {
      console.log(500, "errorv ", error.message);
    }
  };

const write = async (data) => {
  try {
    const pro = await project_1.create(data);
    // console.log(pro);
    return ( pro )
  } catch (error) {
    console.log(500, "errorv ", error.message);
  }
};


export default read
export {write}