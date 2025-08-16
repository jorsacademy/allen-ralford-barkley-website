const bcrypt = require('bcryptjs');
const database = require('./config/database');

async function setupAdmin() {
  const db = database.getDb();
  
  // Create admin user
  const adminEmail = 'admin@allenralfordbarkley.com';
  const adminPassword = 'admin123'; // Change this!
  
  try {
    // Check if admin already exists
    const existingAdmin = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM users WHERE email = ?', [adminEmail], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return existingAdmin.id;
    }

    // Create admin user
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    
    const adminId = await new Promise((resolve, reject) => {
      db.run(`INSERT INTO users (email, password_hash, first_name, last_name, is_admin) 
              VALUES (?, ?, ?, ?, ?)`, 
        [adminEmail, passwordHash, 'Allen', 'Barkley', true], 
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });

    console.log('✅ Admin user created:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('   ⚠️  Change password after first login!');
    
    return adminId;
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    throw error;
  }
}

async function createSampleCourse() {
  const db = database.getDb();
  
  try {
    // Check if sample course exists
    const existingCourse = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM courses WHERE title LIKE ?', ['%Operations Research%'], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existingCourse) {
      console.log('✅ Sample course already exists');
      return;
    }

    // Create sample course
    const courseData = {
      title: 'Advanced Operations Research & Optimization',
      description: 'Master the fundamentals of operations research, linear programming, and optimization techniques used in modern business environments. Learn how to solve complex business problems using mathematical modeling and data-driven decision making.',
      price: 199.99,
      currency: 'USD',
      thumbnailUrl: null,
      videoUrl: 'https://www.youtube.com/watch?v=example', // Replace with actual video
      durationMinutes: 480, // 8 hours
      level: 'intermediate',
      category: 'Operations Research',
      isPublished: true
    };

    await new Promise((resolve, reject) => {
      db.run(`INSERT INTO courses (title, description, price, currency, thumbnail_url, 
                                  video_url, duration_minutes, level, category, is_published) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [courseData.title, courseData.description, courseData.price, courseData.currency, 
         courseData.thumbnailUrl, courseData.videoUrl, courseData.durationMinutes, 
         courseData.level, courseData.category, courseData.isPublished], 
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });

    console.log('✅ Sample course created: "Advanced Operations Research & Optimization"');
  } catch (error) {
    console.error('❌ Error creating sample course:', error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Setting up admin user and sample course...\n');
  
  try {
    await setupAdmin();
    await createSampleCourse();
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Open http://localhost:3000/courses.html in your browser');
    console.log('2. Register/login to test the platform');
    console.log('3. Go to /admin.html to manage courses');
    console.log('4. Get your Stripe API keys to enable payments');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  } finally {
    database.close();
    process.exit(0);
  }
}

main();
