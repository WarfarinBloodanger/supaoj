function render() {
    const supabase = getClient();
    const problemNameEl = document.getElementById('problem_name');
    const optionsEl = document.getElementById('options');
    const containerEl = document.getElementById('problem_container');

    const id = getArgs('id');
    
    if (id) {
        const { data: problem, error } = await supabase
            .from('problems')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            containerEl.innerHTML = `<p>No such problem</p>`;
            return;
        }

        problemNameEl.textContent = problem.name;
        
        optionsEl.innerHTML = `
            <a href="/submit?id=${id}">Submit</a>
            <a href="/problem">Problem List</a>
        `;

        try {
            const info = JSON.parse(problem.info);
            containerEl.innerHTML = info.description || '<p>No description</p>';
        } catch (e) {
            containerEl.innerHTML = '<p>No description</p>';
        }
    } else {
        const page = parseInt(getArgs('page')) || 1;
        const pageSize = 20;
        
        const { count: totalCount } = await supabase
            .from('problems')
            .select('*', { count: 'exact', head: true });

        const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
        const currentPage = Math.max(1, Math.min(page, totalPages));
        
        const from = (currentPage - 1) * pageSize;
        const to = from + pageSize - 1;
        
        const { data: problems, error } = await supabase
            .from('problems')
            .select('id, name')
            .order('id')
            .range(from, to);

        if (error) {
            containerEl.innerHTML = `<p>Load problem list failed</p>`;
            return;
        }

        problemNameEl.textContent = "Problem List";
        
        const prev1 = Math.max(1, currentPage - 1);
        const prev10 = Math.max(1, currentPage - 10);
        const prev100 = Math.max(1, currentPage - 100);
        const next1 = Math.min(totalPages, currentPage + 1);
        const next10 = Math.min(totalPages, currentPage + 10);
        const next100 = Math.min(totalPages, currentPage + 100);

        optionsEl.innerHTML = `
            <a href="/problem?page=${prev100}">Prev 100</a>
            <a href="/problem?page=${prev10}">Prev. 10</a>
            <a href="/problem?page=${prev1}">Prev. 1</a>
            <span>Current Page: ${currentPage}</span>
            <a href="/problem?page=${next1}">Next. 1</a>
            <a href="/problem?page=${next10}">Next. 10</a>
            <a href="/problem?page=${next100}">Next. 100</a>
        `;

        let tableHTML = `
            <table border="1" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
        `;

        problems.forEach(problem => {
            tableHTML += `
                <tr>
                    <td><a href="/problem?id=${problem.id}">${problem.id}</a></td>
                    <td><a href="/problem?id=${problem.id}">${problem.name}</a></td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        containerEl.innerHTML = tableHTML;
    }
}

render();
