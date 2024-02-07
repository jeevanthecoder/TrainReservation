package com.example.adminservice.service;

import com.example.adminservice.Dao.AdminRepository;
import com.example.adminservice.Dao.ClassTypeRepository;
import com.example.adminservice.Dao.TrainRepository;
import com.example.adminservice.entity.AdminAccess;
import com.example.adminservice.entity.ClassType;
import com.example.adminservice.entity.TrainDetails;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class TrainService {


    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ClassTypeRepository classTypeRepository;



    @Transactional
    public void deleteTrainDetails(String TrainNumber,String error){

        try {
            TrainDetails trainDetails = this.trainRepository.findTrainDetailsByTrainNumber(TrainNumber);
            AdminAccess adminAccess = trainDetails.getAdminAccess();
            adminAccess.getTrainDetails().remove(trainDetails);

            this.trainRepository.deleteTrainDetailsByTrainNumber(TrainNumber);
            System.out.println("TrainDetails Deleted Successfully!!!");
        }catch(Exception e){
            error=e.toString();
        }

    }

    @Transactional
    public Set<TrainDetails> TrainDetailsOfAdmin(String adminName){
        AdminAccess adminAccess = this.adminRepository.findAdminAccessByAdminName(adminName);
        if(adminAccess==null){
            return null;
        }else{
            return adminAccess.getTrainDetails();
        }
    }

    @Transactional
    public TrainDetails TrainNameByTrainNumber(String trainNumber){
        TrainDetails trainDetails = this.trainRepository.findTrainDetailsByTrainNumber(trainNumber);
        if(trainDetails==null){
            return null;
        }else{
            return trainDetails;
        }
    }
}
