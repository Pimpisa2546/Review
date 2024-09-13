package entity

import(
	"gorm.io/gorm"
)

type Products struct{
	gorm.Model
	//Products_id int `gorm:"primaryKey"`
	Title string
	Description string
	Price float32
	Category string
	Picture_product string`gorm:"type:longtext"`
	Condition string
	Weight float32
	Status string
	Review []Review `gorm:"foreignKey:products_id"`

}