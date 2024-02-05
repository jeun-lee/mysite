const sectionIds = ['#home','#about','#skills','#work','#testimonials','#contact'];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[href="${id}"]`));
const visibleSections = sectionIds.map(() => false);

const options = {};
const observer = new IntersectionObserver(observercallback, options);
sections.forEach((section) => observer.observe(section));

function observercallback(entries) {
    let selectLastOne;

    entries.forEach((entry) => {
        const index = sectionIds.indexOf(`#${entry.target.id}`);
        visibleSections[index] = entry.isIntersecting;
        console.log(visibleSections);
        selectLastOne = index === sectionIds.length - 1 && //엔트리 인덱스가 마지막
        entry.isIntersecting && //마지막 엔트리가 보여지고
        entry.intersectionRatio >= 0.99; // 99%가 다 보여지면 true
        console.log('무조건 라스트 섹션!!', selectLastOne);

        const navIndex = selectLastOne
         ? sectionIds.length - 1 //true
         : findFirstIntersecting(visibleSections); //false
        console.log(sectionIds[navIndex]);
    });
}

function findFirstIntersecting(intersections) {
    const index = intersections.indexOf(true);
    return index >= 0 ? index : 0
}