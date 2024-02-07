package com.example.adminservice.Dao;

import com.example.adminservice.entity.TrainDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Set;

@EnableJpaRepositories
public interface TrainRepository extends JpaRepository<TrainDetails,Integer> {

    public TrainDetails findTrainDetailsByTrainName(final String TrainName);

    public void deleteTrainDetailsByTrainNumber(final String TrainNumber);

    public TrainDetails findTrainDetailsByTrainNumber(String trainNumber);

}
