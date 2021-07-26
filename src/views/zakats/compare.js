
export default function compare(a,b){
    if (a.key_value>b.key_value) {
        return -1;
    }
    else if(a.key_value==b.key_value){
        return 0
    }else{
        return 1;
    }
}