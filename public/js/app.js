$(document).ready(function() {
    
    onload();

    $(document).on("click",".scrape",function(e){
        e.preventDefault();
        $.post("/scrape").then(function(data) {
            console.log(data)
            document.location.reload();
        })
    })

    $(document).on("click",".clear",function(e){
        e.preventDefault();
        $.ajax('/clear', {
            method: 'DELETE', 
        }).then(function(data){
            document.documentElement.innerHTML=data;
        })
    })

    $(document).on("click","#saveArticle",function(e){
        e.preventDefault();
        let id = $(this).parent().attr("data-id")
        console.log("id===>",id)
        $.ajax("/saved/"+id,{
            method:'PUT',
        }).then(function(result){
            //console.log(result)
            onload();
        })

    })
    
   


$(document).on("click","#savedArticles",function(e){

    e.preventDefault();
    $.get("/saved", function (data) {
        document.documentElement.innerHTML = data;
    });
})

$(document).on("click","#notes",function(e){

    e.preventDefault();
    let id = $(this).parent().parent().attr("data-id")
    $('#modalNotes').modal().modal('open');
    $.get("/notes/"+id,function(result){
        console.log(result);
        if(result.note){

            var btn = ($("<button>")).text("X").attr("class","noteDelete modal-close");
            
            $("<li>").text(result.note.title).attr("data-id",result.note._id).append(btn).appendTo($("#savedNotes"));

        }
        else{
            $("<li>").text("No articles is available").appendTo($("#savedNotes"));
        }
    })

   

    
})
$(document).on("click",".saveNotes",function(e){
    let id = $(this).parent().parent().attr("data-id");
    let note = $("#newNote").val();
    let data = {
        title:note
    }
    $.post("/noteAdded/"+id,data).then(function(result){
        console.log("save notes",id,note);
    })
    
})

$(document).on("click",".noteDelete",function(){
    let id = $(this).parent().attr("data-id");
    $.ajax("/deletNote/"+id,{
        method:'DELETE'
    }).then(function(result){
        console.log("note deleted")
    })
})

function onload() {
    console.log("inside")
    $.get("/articles", function (data) {
        document.documentElement.innerHTML = data;
    });
}

// $('#modalNote').modal();
// $('#modalNote').modal('open');

})
