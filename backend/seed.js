const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const Service = require('./models/serviceModel');
const Staff = require('./models/staffModel');
const User = require('./models/userModel');

const services = [
  {
    name: 'Prerje Flokësh',
    description: 'Prerje profesionale e përshtatur me formën e fytyrës suaj.',
    category: 'flok',
    price: 1500,
    duration: 45,
  },
  {
    name: 'Ngjyrosje Flokësh',
    description: 'Ngjyrosje me produkte premium pa dëmtuar flokët.',
    category: 'flok',
    price: 4500,
    duration: 120,
  },
  {
    name: 'Balayage',
    description: 'Teknikë moderne për ngjyrë natyrale dhe graduale.',
    category: 'flok',
    price: 7000,
    duration: 150,
  },
  {
    name: 'Keratin Treatment',
    description: 'Trajtim intensiv për flokë të lëmuar dhe me shkëlqim.',
    category: 'flok',
    price: 6000,
    duration: 90,
  },
  {
    name: 'Makeup Dasmës',
    description: 'Makeup i plotë për ditën tuaj të veçantë.',
    category: 'makeup',
    price: 5000,
    duration: 90,
  },
  {
    name: 'Makeup Festiv',
    description: 'Look i mrekullueshëm për çdo rast special.',
    category: 'makeup',
    price: 3000,
    duration: 60,
  },
  {
    name: 'Manikyr Klasik',
    description: 'Kujdes i plotë i duarve dhe lak profesional.',
    category: 'thonje',
    price: 1200,
    duration: 45,
  },
  {
    name: 'Gel Manikyr',
    description: 'Manikyr me gel që zgjat deri 3 javë.',
    category: 'thonje',
    price: 2000,
    duration: 60,
  },
  {
    name: 'Pedikyri',
    description: 'Trajtim i plotë i këmbëve dhe lak.',
    category: 'thonje',
    price: 1500,
    duration: 60,
  },
  {
    name: 'Zgjatim Qerpikësh',
    description: 'Zgjatim natyral me teknikë fiber optike.',
    category: 'qerpik',
    price: 3500,
    duration: 90,
  },
  {
    name: 'Ngjyrosje Qerpikësh',
    description: 'Ngjyrosje e qerpikëve dhe vetullave.',
    category: 'qerpik',
    price: 1000,
    duration: 30,
  },
  {
    name: 'Facial Classic',
    description: 'Pastrimi i thellë i lëkurës dhe hidratim intensiv.',
    category: 'facial',
    price: 3000,
    duration: 60,
  },
];

const staff = [
  {
    name: 'Arta Hoxha',
    role: 'Stiliste Flokësh',
    bio: 'Mbi 8 vjet eksperiencë në stilim dhe ngjyrosje flokësh. E certifikuar ndërkombëtarisht.',
    specializations: ['Balayage', 'Keratin', 'Ngjyrosje'],
    workingDays: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    isAvailable: true,
  },
  {
    name: 'Mirela Duka',
    role: 'Makiazhistë Profesionale',
    bio: 'Eksperte e makeup-it artistik dhe dasmës. Ka punuar me mbi 500 nuse.',
    specializations: ['Makeup Dasme', 'Makeup Artistik', 'Airbrush'],
    workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    isAvailable: true,
  },
  {
    name: 'Elona Krasniqi',
    role: 'Tekniciene Thonjësh',
    bio: 'Specialiste e manikyr dhe pedikyri me 5 vjet eksperiencë.',
    specializations: ['Gel', 'Akrilik', 'Nail Art'],
    workingDays: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    isAvailable: true,
  },
  {
    name: 'Sara Brahimi',
    role: 'Specialiste Facial & Qerpikë',
    bio: 'Eksperte e trajtimeve të lëkurës dhe zgjatimit të qerpikëve.',
    specializations: ['Facial', 'Zgjatim Qerpikesh', 'Mikroblading'],
    workingDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    isAvailable: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    await Service.deleteMany({});
    await Staff.deleteMany({});
    console.log('Pastruar te dhenat e vjetra');

    await Service.insertMany(services);
    console.log('U shtuan', services.length, 'sherbime');

    await Staff.insertMany(staff);
    console.log('U shtuan', staff.length, 'punonjese');

    const existing = await User.findOne({ email: 'admin@glamour.al' });
    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'Admin',
        email: 'admin@glamour.al',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin u krijua: admin@glamour.al / admin123');
    }

    console.log('Seed u krye me sukses!');
    process.exit(0);
  } catch (err) {
    console.error('Gabim:', err.message);
    process.exit(1);
  }
}

seed();
