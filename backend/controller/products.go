package controller

import (
	"net/http"
	"example.com/Review/config"
	"example.com/Review/entity"
	"github.com/gin-gonic/gin"
)

func GetProduct(c *gin.Context) {
	ID := c.Param("id") // รับ room_id จาก URL

	var product entity.Products // สร้างตัวแปรเก็บข้อมูล Messages

	db := config.DB() // เชื่อมต่อกับฐานข้อมูล

	// ดึงข้อความทั้งหมดใน RoomChat ที่มี room_id ตามที่ระบุ
	results := db.Preload("Review").First(&product, ID)


	// ตรวจสอบว่าพบข้อมูลหรือไม่
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if product.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	// ส่งข้อมูล Messages กลับไปในรูปแบบ JSON
	c.JSON(http.StatusOK, product)
}
