import fs from 'fs';
import path from 'path';

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf-8');
    for (const [search, replace] of replacements) {
        if (typeof search === 'string') {
            content = content.replaceAll(search, replace);
        } else {
            content = content.replace(search, replace);
        }
    }
    fs.writeFileSync(filePath, content);
}

// 1. App.tsx
replaceInFile('src/App.tsx', [
    ['import getBase from "./components/getBaseURL";\n', ''],
    ['<BrowserRouter>', '<BrowserRouter basename={import.meta.env.BASE_URL}>'],
    ['getBase("")', '"/"'],
    ['getBase("introduce")', '"/introduce"'],
    ['getBase("activities")', '"/activities"'],
    ['getBase("clubmagazine")', '"/clubmagazine"'],
    ['getBase("exams")', '"/exams"'],
    ['getBase("contact")', '"/contact"'],
    ['getBase("note")', '"/note"'],
]);

// 2. Navbar.tsx
replaceInFile('src/components/Navbar.tsx', [
    ['import getBase from "./getBaseURL";\n', ''],
    ['getBase("")', '"/"'],
    ['getBase("introduce")', '"/introduce"'],
    ['getBase("activities")', '"/activities"'],
    ['getBase("clubmagazine")', '"/clubmagazine"'],
    ['getBase("exams")', '"/exams"'],
    ['getBase("note")', '"/note"'],
    ['getBase("contact")', '"/contact"'],
]);

// 3. Home.tsx
replaceInFile('src/pages/Home.tsx', [
    ['import getBase from "../components/getBaseURL";\n', ''],
    ['getBase("news.json")', '"/news.json"'],
    ['getBase("introduce")', '"/introduce"'],
    ['getBase("clubmagazine")', '"/clubmagazine"'],
    ['getBase("exams")', '"/exams"'],
]);

// 4. HeroSlider.tsx
replaceInFile('src/components/HeroSlider.tsx', [
    ['import getBase from "./getBaseURL";\n', ''],
    ['getBase("img/Hero/slide1.jpg")', '"/img/Hero/slide1.jpg"'],
    ['getBase("img/Hero/slide2.jpg")', '"/img/Hero/slide2.jpg"'],
    ['getBase("img/Hero/slide3.jpg")', '"/img/Hero/slide3.jpg"'],
    ['getBase("img/Hero/MathematicalClubTitle.svg")', '"/img/Hero/MathematicalClubTitle.svg"'],
]);

// 5. PageTitle.tsx
replaceInFile('src/components/PageTitle.tsx', [
    ['import getBase from "./getBaseURL";\n', ''],
    ['getBase("img/Introduce/books.jpg")', '"/img/Introduce/books.jpg"'],
]);

// 6. IntroduceContents.tsx
replaceInFile('src/contents/IntroduceContents.tsx', [
    ['import getBase from "../components/getBaseURL";\n', ''],
    ['getBase("img/Introduce/room.jpg")', '"/img/Introduce/room.jpg"'],
]);

// 7. ExamsContents.tsx
replaceInFile('src/contents/ExamsContents.tsx', [
    ['import getBase from "../components/getBaseURL";\n', ''],
    ['getBase("exams.json")', '"/exams.json"'],
]);

// 8. ActivitiesContents.tsx
replaceInFile('src/contents/ActivitiesContents.tsx', [
    ['import getBase from "../components/getBaseURL";\n', ''],
    ['getBase("activities.json")', '"/activities.json"'],
]);

// 9. NoteCalendar.tsx
replaceInFile('src/components/NoteCalendar.tsx', [
    ['import getBase from "./getBaseURL";\n', ''],
    ['getBase("notes.json")', '"/notes.json"'],
]);

// 10. README.md
replaceInFile('README.md', [
    ['import getBase from "./components/getBaseURL";\n', ''],
    ['<Route path={getBase("")} element={<Home />} />', '<Route path="/" element={<Home />} />'],
    ['<Route path={getBase("about")} element={<About />} />', '<Route path="/about" element={<About />} />'],
    ['import getBase from "./getBaseURL";\n', ''],
    ['<Link to={getBase("about")}>Aboutページへ</Link>;', '<Link to="/about">Aboutページへ</Link>;'],
]);

// 11. Remove getBaseURL.ts
if (fs.existsSync('src/components/getBaseURL.ts')) {
    fs.unlinkSync('src/components/getBaseURL.ts');
}

console.log("Done");
