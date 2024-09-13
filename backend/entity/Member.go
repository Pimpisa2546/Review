package entity

import (
	"gorm.io/gorm"
)

type Member struct {
	gorm.Model

	//Member_id    int `gorm:"primaryKey:Member_id"`
	Username     string
	Password     string
	Email        string
	First_name   string
	Last_name    string
	Phone_number string
	Address      string
	Profile_pic   string `gorm:"type:longtext"`
	Review []Review `gorm:"foreignKey:Member_id"`
}
