//向堆中插入node值
export function push(heap,node){
    const index = heap.length;
    heap.push(node);
    //向上调整
    siftUp(heap,node,index);
}

//获取堆顶元素
export function peek(heap){
    return heap.length === 0 ? null : heap[0];
}

//删除堆顶元素
export function pop(heap){
    if(heap.length === 0){
        return null;
    }
    const first = heap[0];
    const last = heap.pop();
    if(first!== last){
        heap[0] = last;
        //向下调整
        siftDown(heap,last,0);
    }
    return first;
}

function getParentIndex(i){
    return Math.floor((i-1)/2);
}

function leftIndex(i){
    return i*2+1;
}
function rightIndex(i){
    return i*2+2;
}

//向上调整
function siftUp(heap,node,i){
    let index = i;
    while(index > 0){
        const parentIndex = getParentIndex(index);
        const parent = heap[parentIndex];
        if(compare(parent,node) > 0){
           //交换位置
           heap[parentIndex] = node;
           heap[index] = parent;
           index = parentIndex;
        }else{
            return
        }
    }
}

// 向下调整
//      |
//      |
function siftDown(heap,node,i){
    let index = i
    const l = leftIndex(i),
          r = rightIndex(i),
          pn = heap[i],
          ln = heap[l],
          rn = heap[r];
     let small = i;
    //  找到 pn、ln、rn 中最小的那个
     if(l < heap.length && compare(ln,pn) < 0){
         small = l;
     }
     if(r < heap.length && compare(rn,heap[small]) < 0){
         small = r;
     }
     if(small !== i){
        heap[i] = heap[small];
        heap[small] = node;
        index = small;
        siftDown(heap,heap[small],index);
    }
}
function compare(a,b){
    const diff = a.sortIndex - b.sortIndex
    return diff!= 0 ? diff : a.id - b.id;
}
