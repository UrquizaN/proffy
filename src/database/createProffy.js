module.exports = async function(db, { proffy, classProffy, classSchedule}) {
    // inserir dados na tabela proffy
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffy.name}",
            "${proffy.avatar}",
            "${proffy.whatsapp}",
            "${proffy.bio}"
        );
    `)
    
    const proffy_id = insertedProffy.lastID

    // inserir dados na tabela classes
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${ classProffy.subject}",
            "${ classProffy.cost}",
            "${ proffy_id}"
        );
    `)
    
    const class_id = insertedClass.lastID

    // inserir dados na tabela classSchedule
    const insertedClassSchedule = classSchedule.map( (classSchedule) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classSchedule.weekday}",
                "${classSchedule.time_from}",
                "${classSchedule.time_to}"
            );  
        `)
    })

    await Promise.all(insertedClassSchedule)
}