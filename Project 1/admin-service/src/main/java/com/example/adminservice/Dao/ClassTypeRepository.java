package com.example.adminservice.Dao;

import com.example.adminservice.entity.ClassType;
import com.example.adminservice.entity.TrainDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ClassTypeRepository extends JpaRepository<ClassType,Integer> {

    public void deleteByTrainDetails(TrainDetails trainDetails);
}
