package entity

import(
	"gorm.io/gorm"
)

type Review struct{
	gorm.Model
	//Review_id int `gorm:"primaryKey"`
	Rating int
	Comment string

	Member_id  uint
	Member    *Member  `gorm:"foreignKey: member_id"`

	ProductsID  uint
	Products    *Products  `gorm:"foreignKey: products_id"`
}