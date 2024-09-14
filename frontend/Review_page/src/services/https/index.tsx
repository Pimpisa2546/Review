import axios from "axios";


const CreateReview = async (reviewData: { rating: number, comment: string, productsID: number }) => {
  try {
    const response = await axios.post("http://localhost:8000/review", reviewData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", response.data);
    alert("สร้างรีวิวสำเร็จ!");
  } catch (error) {
    console.error("Error creating review:", error);
    alert("เกิดข้อผิดพลาดในการสร้างรีวิว");
  }
};

// ฟังก์ชันอัปเดตรีวิว
const UpdateReview = async (reviewId: number, updatedReview: { rating: number, comment: string }) => {
  try {
    const response = await axios.put(`http://localhost:8000/review/${reviewId}`, updatedReview, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", response.data);
    alert("อัปเดตรีวิวสำเร็จ!");
  } catch (error) {
    console.error("Error updating review:", error);
    alert("เกิดข้อผิดพลาดในการอัปเดตรีวิว");
  }
};

// ฟังก์ชันลบรีวิวตาม ID
const DeleteReview = async (reviewId: number) => {
  try {
    const response = await axios.delete(`http://localhost:8000/review/${reviewId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", response.data);
    alert("ลบรีวิวสำเร็จ!");
  } catch (error) {
    console.error("Error deleting review:", error);
    alert("เกิดข้อผิดพลาดในการลบรีวิว");
  }
};

export {
  CreateReview,
  UpdateReview,
  DeleteReview,
};
