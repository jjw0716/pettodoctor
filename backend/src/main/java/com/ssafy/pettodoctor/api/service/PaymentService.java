package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Treatment;
import com.ssafy.pettodoctor.api.domain.TreatmentType;
import com.ssafy.pettodoctor.api.repository.TreatmentRepositry;
import com.ssafy.pettodoctor.common.util.CancleRequestUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {
    private final TreatmentRepositry treatmentRepositry;

    public Treatment findById(Long id){
        return treatmentRepositry.findByTreatmentId(id);
    }

    public void cancleTreatment(Long treatmentId, String reason){
        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);
        if(treatment.getType().equals(TreatmentType.RES_PAID)) {
            // access-token 발급
            String accessToken = CancleRequestUtil.getAccessToken2();
            // 결제 취소 요청 보내기
            String mId = treatment.getPaymentCode();
            Integer amount = treatment.getPrice();
            CancleRequestUtil.passCancleRequest(accessToken, mId, reason, amount);
            System.out.println("send cancel request to imaport");
        }
        treatment.setType(TreatmentType.RES_CANCEL);
    }
}