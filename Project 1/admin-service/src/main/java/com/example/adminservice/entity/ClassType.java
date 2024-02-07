package com.example.adminservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ClassType {

    @Id
    @GeneratedValue
    int cId;

    String classtype;

    public Long numberOfSeats;

    public int costPerSeat;

    @ManyToOne
    @JsonBackReference
    public TrainDetails trainDetails;

    public String getClasstype() {
        return classtype;
    }

    public ClassType setClasstype(String classtype) {
        this.classtype = classtype;
        return this;
    }

    public TrainDetails getTrainDetails() {
        return trainDetails;
    }

    public ClassType setTrainDetails(TrainDetails trainDetails) {
        this.trainDetails = trainDetails;
        return this;
    }

}
