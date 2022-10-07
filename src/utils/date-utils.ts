export class DateUtils {
    public static compare(d1: string, d2: string) {
        if (d1 < d2) {
            return 1;
        } else if(d1 > d2){
            return -1;
        } else {
            return 0;
        }
    }
}
