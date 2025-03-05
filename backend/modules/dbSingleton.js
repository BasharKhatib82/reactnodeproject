/**
 * מודול לניהול חיבור בודד למסד נתונים MySQL באמצעות MySQL2
 * 
 * מודול זה משתמש בתבנית Singleton כדי לוודא שלא נוצרים חיבורים מיותרים
 * אלא נעשה שימוש בחיבור קיים אם הוא כבר נוצר.
 */

const mysql = require('mysql2'); // ייבוא ספריית MySQL2 לטובת חיבור למסד הנתונים

let connection; // משתנה לאחסון חיבור בודד למסד הנתונים

const dbSingleton = {
    /**
     * פונקציה המחזירה את החיבור למסד הנתונים
     * אם אין חיבור קיים, היא יוצרת חיבור חדש ושומרת אותו
     * 
     * @returns {object} חיבור למסד הנתונים
     */
    getConnection: () => {
        if (!connection) { // בדיקה אם אין חיבור קיים
            // יצירת חיבור למסד הנתונים
            connection = mysql.createConnection({
                host: 'localhost', // כתובת השרת של מסד הנתונים
                user: 'root', // שם המשתמש של מסד הנתונים
                password: '', // סיסמת מסד הנתונים
                database: 'inquiry_management_db', // שם מסד הנתונים
            });

            // ניסיון להתחבר למסד הנתונים
            connection.connect((err) => {
                if (err) { // במקרה של שגיאה בחיבור
                    console.error('Error connecting to the database:', err);
                    throw err; // זריקת שגיאה לעצירת התהליך
                }
                console.log('Connection to MySQL was successful!');
            });

            // ניהול שגיאות חיבור
            connection.on('error', (err) => {
                console.error('Database connection error:', err);
                if (err.code === 'PROTOCOL_CONNECTION_LOST') { 
                    // אם החיבור נותק, איפוס החיבור כדי לאפשר התחברות מחדש
                    connection = null;
                }
            });
        }

        return connection; // החזרת החיבור הקיים או החדש
    },
};

module.exports = dbSingleton; // ייצוא המודול לשימוש בקבצים אחרים
