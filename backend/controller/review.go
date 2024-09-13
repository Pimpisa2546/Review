package controller

import (
	"net/http"

	"example.com/Review/config"
	"example.com/Review/entity"
	"github.com/gin-gonic/gin"
)

// CreateReview - สร้างข้อมูลรีวิวใหม่
func CreateReview(c *gin.Context) {
	var review entity.Review

	// ตรวจสอบข้อมูล JSON ที่ส่งมา
	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เชื่อมต่อฐานข้อมูล
	db := config.DB()

	// ตรวจสอบว่าสินค้าที่รีวิวมีอยู่ในระบบหรือไม่
	var product entity.Products
	db.First(&product, review.ProductsID)
	if product.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบสินค้าดังกล่าว"})
		return
	}

	// สร้างรีวิวใหม่
	r := entity.Review{
		Rating:     review.Rating,
		Comment:    review.Comment,
		ProductsID: review.ProductsID,
	}

	// บันทึกรีวิวลงฐานข้อมูล
	if err := db.Create(&r).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ส่งผลลัพธ์กลับไปยังผู้ใช้
	c.JSON(http.StatusCreated, gin.H{"message": "รีวิวสินค้าแล้ว", "data": r})
}

// UpdateReview - อัปเดตรีวิวตาม ID
func UpdateReview(c *gin.Context) {
	var review entity.Review

	// ดึงค่า ID ของรีวิวจาก URL
	Review_id := c.Param("id")

	// เชื่อมต่อฐานข้อมูล
	db := config.DB()

	// ค้นหารีวิวตาม ID
	result := db.First(&review, Review_id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	// ตรวจสอบข้อมูล JSON ที่ส่งมา
	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// บันทึกการแก้ไขรีวิวลงในฐานข้อมูล
	result = db.Save(&review)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	// ส่งผลลัพธ์กลับไปยังผู้ใช้
	c.JSON(http.StatusOK, gin.H{"message": "บันทึกการแก้ไขรีวิวแล้ว"})
}
