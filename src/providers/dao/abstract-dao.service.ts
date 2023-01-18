export abstract class AbstractDaoService{

    protected async extractResultSet(res: { rows: { length: number; item: (arg0: number) => any } }){
        const results: any[] = [];
        for (let i = 0; i < res.rows.length; i++) {
            results.push(await this.extract(res.rows.item(i)));
        }

        return results;
    }

    protected abstract extract(res: any);
}
