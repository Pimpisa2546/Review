package main

import (
	"net/http"

	"example.com/Review/controller"
	"github.com/gin-gonic/gin"

	"example.com/Review/config"
	//"gorm.io/driver/sqlite"
)

func main() {

	const PORT = "8000" // กำหนดหมายเลขพอร์ต
	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("")
	{

		// User Routes
		router.POST("/review", controller.CreateReview)
		router.GET("/products/:id", controller.GetProduct)
		router.PUT("/review/:id", controller.UpdateReview)
		// router.POST("/message", controller.SetMessage)
		// router.GET("/roomchat/:room_id", controller.GetRoomChat)
		// router.GET("/member/:member_id", controller.GetMember)
		// router.GET("/seller/:id", controller.GetSeller)
		// 	router.DELETE("/users/:id", controller.DeleteUser)
		// 	// Gender Routes
		// 	router.GET("/genders", controller.ListGenders)
		// }

		r.GET("/", func(c *gin.Context) {
			c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
		})

		
	}
	r.Run("localhost:" + PORT)  // Run the server
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
