// NOTE: THE MOVIE RELATED CODE WAS CREATED USING A MOCK DATABASE IN ORDER TO UNDERSTAND
// HOW MONGODB AND SPRING BOOT WORK
// IT IS NOT RELATED TO THE PROJECT.

package dev.cscserver.cscserver;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document (collection = "movies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    @Id
    private ObjectId id;
    
    private String plot;

    private String title;

    private String year;

    private String trailerLink;

    private List <String> genre;
    

}
