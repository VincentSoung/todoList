var app = new Vue({
    el: "#app",
    data: {
        todomsg:"",
        todos: [],
        finishedItems: [],
        deletedItems: [],
        deleteListStyle: {
            "text-decoration": "line-through solid red"
        }
    }, 
    methods: {
        addTodoItem: function() {
            this.todos.push({
                lastTime: new Date(),
                createTime: new Date(),
                finishTime: null,
                deleteTime: null,
                isDelete: false,
                finished: false,
                title: this.todomsg,
                id : this.todos.length + this.finishedItems.length 
                    + this.deletedItems.length + 1
            });
            this.todomsg = "";
        },
        finishFn: function(item, index) {
            let dateTime = new Date();
            item.finished = true;
            item.finishTime = dateTime;
            item.lastTime = dateTime;
            //从代办中将完成的项移除
            this.todos.splice(index, 1);
            //加入到已完成中
            this.finishedItems.push(item);
        },
        redo: function(item, index) {
            if (item.finished) {
                //从已完成中将 要继续做的 移除
                this.finishedItems.splice(index, 1);
                item.finishTime = null;
                item.finished = false;
            }
            if (item.isDelete) {
                this.deletedItems.splice(index, 1);
                item.isDelete = false;
                item.deleteTime = null;
            }
            item.lastTime = new Date();
            //加入到代办中
            this.todos.push(item);
        },
        remove: function(item, index) {
            let dateTime = new Date();
            item.isDelete = true;
            item.deleteTime = dateTime;
            item.lastTime = dateTime;
            this.todos.splice(index, 1);
            this.deletedItems.push(item);
        }
    }
});
