$(document).ready(function() {
    
    onload();

    $(document).on("click",".scrape",function(e){
        e.preventDefault();
        $.post("/scrape").then(function(data) {
            
            //document.location.reload();
            onload();
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

    $(document).on("click","#clearSavedArt",function(e){
        e.preventDefault();
        let id = $(this).parent().parent().attr("data-id");
        console.log(id)
        $.ajax("/deleteSavedArticle/"+id,{
            method:'DELETE',
        }).then(function(data){
            console.log(data)
            savedArticleload();
        })
    })
    
   


$(document).on("click","#savedArticles",function(e){

    e.preventDefault();
    savedArticleload();
})

$(document).on("click","#notes",function(e){

    e.preventDefault();
    let id = $(this).parent().parent().attr("data-id")
    $('#modalNotes').modal().modal('open');
    $.get("/notes/"+id,function(result){
        
        $('.modal-content').empty();
        $("#newNote").val("");
        let ul = $("<ul>").attr("data-id",id)
        $('.modal-content').append("<h4>Notes for article: " +id+"</h4><hr></hr>").append(ul);
        
        if(result[0].notes.length>0){
            let notes = (result[0].notes)
            notes.forEach((elem)=>{
                var btn = ($("<button>")).text("X").attr("class","noteDelete modal-close");
                $("<li>").text(elem.title).attr("data-id",elem._id).append(btn).appendTo(ul);
            })  
        }
        else{
            $("<li>").text("No notes is available").appendTo(ul);
        }

       $("<textarea>").attr("id","newNote").appendTo($('.modal-content'))
    })
    
})
$(document).on("click",".saveNotes",function(e){
    let id = $(this).parent().parent().find("ul").attr("data-id");
    console.log(id)
    let note = $("#newNote").val();
    let data = {
        title:note
    }
    $.post("/noteAdded/"+id,data).then(function(result){
        console.log("save notes",id,note);
        $("#newNote").val("");
    })
    
})

$(document).on("click",".noteDelete",function(){
    let id = $(this).parent().attr("data-id");
    let articleId = $(this).parent().parent().attr("data-id");
    
    $.ajax("/deletNote/"+id+"/"+articleId,{
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

function savedArticleload() {
    
    $.get("/savedArticle", function (data) {
        document.documentElement.innerHTML = data;
        $(".scrape").hide();
    });
}
})


