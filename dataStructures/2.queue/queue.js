export class Queue{
    constructor(){
        // 记录队列最大序号
        this.count =0;
        // 记录队列最小序号
        this.lowestcount = 0;
        this.items = {};
    }

    enqueue(...elements){
        for (const element of elements) {
            this.items[this.count] = element
            this.count++;      
        }
    }

    dequeue(){
        if(this.isEmpty()){
            return ''
        }
        let result = this.items[this.lowestcount]
        delete this.items[this.lowestcount];
        this.lowestcount++
        return result
    }

    peek(){
        return this.items[this.lowestcount]
    }

    isEmpty(){
        return this.size() === 0;
    }

    size(){
        return this.count-this.lowestcount;
    }

    clear(){
        this.count =0;
        this.lowestcount=0;
        this.items={};
    }

    toString(){
        if(this.isEmpty()){
            return '';
        }
        let queueString = `${this.items[this.lowestcount]}`
        for (let index = this.lowestcount+1; index < this.count; index++) {
            queueString = `${queueString},${this.items[index]}`
        }
        return queueString;
    }
}