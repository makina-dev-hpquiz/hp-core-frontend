export abstract class AbstractDaoService{

    protected extractResultSet(res: { rows: { length: number; item: (arg0: number) => any } }){
        const results: any[] = [];
        for (let i = 0; i < res.rows.length; i++) {
            results.push(res.rows.item(i));
        }

        return results;
      }
}
