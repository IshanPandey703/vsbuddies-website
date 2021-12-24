
export default function MatchCalculator(person1,person2) {
    
    // get common interests
    let sameInterests = 0; 
    const interestSet = new Set(person2.interests);
    person1.interests.forEach(interest => {
        if(interestSet.has(interest)) sameInterests+=1;
    });
    const interestMatchPerson1 = (sameInterests/person1.interests.length);
    const interestMatchPerson2 = (sameInterests/person2.interests.length);

    // get common extensions 
    const extensionSet = new Set(person2.extensions);
    let sameExtensions = 0;
    person1.extensions.forEach(extension => {
        if(extensionSet.has(extension)) sameExtensions+=1; 
    });
    const extensionMatchPerson1 = (sameExtensions/person1.extensions.length);
    const extensionMatchPerson2 = (sameExtensions/person2.extensions.length);
    
    // theme match
    const themeMatch = person1.theme===person2.theme?1:0;
    
    // top two languages match
    let topTwoLanguagesMatch = 0;
    if(person1.topTwoLanguages.includes(person2.topTwoLanguages[0])) topTwoLanguagesMatch+=.5;
    if(person1.topTwoLanguages.includes(person2.topTwoLanguages[1])) topTwoLanguagesMatch+=.5;
    
    // college match
    const collegeMatch = person1.college===person2.college?1:0;

    // matchPercentPerson1-> how similar is person2 to person1 
    // matchPercentPerson1 denoting actv user
    const matchPercentPerson1 = ((interestMatchPerson1*4 + extensionMatchPerson1*2 + (collegeMatch)+ (themeMatch)
                                +topTwoLanguagesMatch*2)*10).toFixed(2);
    
    // matchPercentPerson1-> how similar is person1 to person2
    const matchPercentPerson2 = ((interestMatchPerson2*4 + extensionMatchPerson2*2 + collegeMatch+ themeMatch
                                +topTwoLanguagesMatch*2)*10).toFixed(2);
    
    // Match Percent displayed in card is how similar the other user is to actv user
    return matchPercentPerson1 
}

// Weight Distribution:
// 40% to interest match
// 20% to extension match
// 20% to top two languages match
// 10% to college match
// 10% to theme match





